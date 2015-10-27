export default class TonyDataService{

  constructor($http, $q, $log){
    this.$http = $http;
    this.$q = $q;
    this.$log = $log;
    this.init();
    this.loadData();
  }

  init(){
    let data = {};

    let urls = {};
    let loc = `${location.hostname}/`;
    urls.base = loc.indexOf("localhost") !== -1 || loc.indexOf("192.168.") !== -1 ? "http://52.30.249.142/" : "/";
    urls.origin = `${location.origin}/`;
    urls.memeBase = "tony/";
    urls.imageList = urls.base + "meme_api/memes/";
    urls.imageUpload = urls.base + "meme_api/memes/";
    data.urls = urls;
    console.log(data.urls);

    data.currentTony = {
      link: "images/meme-2x.jpg",
      id: "tony-1138",
      deeplink:`${urls.memeBase}0`
    };


    let dummyList = [];
    for (let i = 0; i < 42; ++i){
      //match format of backend data
      dummyList.push({image: "/images/meme-2x.jpg", id:`tony-1138-${i}`});
    }
    data.dummyList = dummyList;

    let thumbList = [];
    data.thumbList = thumbList;




    this.data = data;
  }

  loadData(){
    this.$http.get( this.data.urls.imageList ).then(
      (data) => {
        console.log(data);
        //this.data.thumbList = data.data;
        this.setThumbList(data.data);
        //return this.data.thumbList;
      },
      (message, code) => {
        this.setThumbList(this.data.dummyList);
        //this.data.thumbList = this.data.dummyList;
        this.$log.warn("$http error - getThumbList: Using dummy list -", message, code);
        //return this.data.thumbList;
      }
    );
  }


  getThumbList(){
    return this.data.thumbList;
  }

  setThumbList(arr){
    let thumbList = this.data.thumbList;
    let memeBase = this.data.urls.memeBase;
    let baseUrl = `${this.data.urls.origin}${memeBase}`;

    thumbList.splice(0,thumbList.length);
    let len = arr.length;
    for( let i = 0; i <  len; ++i ){
      let elem = arr[i];
      elem.url = elem.image;
      elem.deeplink = `${baseUrl}${elem.id}`;
      elem.pushState = `${memeBase}${elem.id}`;
      thumbList.push(elem);
    }
  }

/*
  getThumbList(){
    let promise;

    if (this.data.thumbList.length === 0){
      promise = this.$http.get( this.data.urls.imageList).then(
        (data) => {
          this.data.thumbList = data.data;
          return this.data.thumbList;
        },
        (message, code) => {
          this.data.thumbList = this.data.dummyList;
          this.$log.error("$http error - getThumbList: Using dummy list -", message, code);
          return this.data.thumbList;
        }
      );
    }else{
      let deferred = this.$q.defer();
      deferred.resolve(this.data.thumbList);
      promise = deferred.promise;
    }

    return promise;
  }
*/
  getCurrentTony(){
    return this.data.currentTony;
  }

  setCurrentTony(id){
    let tony = this.data.currentTony;
    let thumb = this.data.thumbList[id];
    tony.link = thumb.url;
    tony.id = thumb.id;
    tony.deeplink = thumb.deeplink;
    tony.pushState = thumb.pushState;
    let state = tony.pushState;
    if (window.location.pathname.indexOf(this.data.urls.memeBase) != -1){
      state = tony.id;
    }

    History.pushState({id: tony.id}, `Tony: ${tony.id}`, state);
  }

  uploadTony(data, onComplete){
    this.$http.post( this.data.urls.imageUpload, { "image": data} ).then(
      (data) => {
        onComplete("success",data);
      },
      (message, code) => {
        onComplete("error", {"message": message, "code": code});
      }
    );
  }
}
