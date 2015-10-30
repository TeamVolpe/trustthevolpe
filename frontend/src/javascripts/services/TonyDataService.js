export default class TonyDataService{

  constructor($http, $q, $log, $document){
    this.$http = $http;
    this.$q = $q;
    this.$log = $log;
    this.$document = $document;
    this.init();
    this.checkDeepLink();
    this.loadData();
  }

  init(){
    let data = {};

    data.title = this.$document[0].title;

    let urls = {};
    let loc = `${location.hostname}/`;
    urls.base = loc.indexOf("localhost") !== -1 || loc.indexOf("192.168.") !== -1 ? "http://52.30.249.142/" : "/";
    urls.origin = `${location.origin}/`;
    urls.memeBase = "tony/";
    urls.imageList = urls.base + "meme_api/memes/";
    urls.imageUpload = urls.base + "meme_api/memes/";
    data.urls = urls;

    let dummyList = [];
    for (let i = 0; i < 42; ++i){
      //match format of backend data
      dummyList.push({image: "/images/meme-2x.jpg", id:`${i}`});
    }
    data.dummyList = dummyList;

    let thumbList = [];
    data.thumbList = thumbList;

    data.currentTony = {
      link: "",
      id: "",
      deeplink: ""
    };


    this.data = data;
  }

  checkDeepLink(){
    let state = History.getState();
    if(state.hash.indexOf(this.data.urls.memeBase) === -1 ){
      // no deeplink
      // don't load something, let it be set by the data list return;
      //this.loadSingleTony(5);
    }else{
      // deeplink
      let id = parseInt(state.url.split(this.data.urls.memeBase)[1]);
      this.loadSingleTony(id);
    }
  }

  loadSingleTony(id){
    let data = this.data;
    if(data.thumbList[id]){
      this.setCurrentTony(id);
    }else{
      this.$http.get( `${data.urls.imageList}${id}` ).then(
        (result) => {
          this.formatImageData(result.data);
          this.setCurrentTonyByData(result.data);
        },
        (message, code) => {
          data.currentTony.link = "images/meme-2x.jpg";
          data.currentTony.id = "tony-1138";
          data.currentTony.deeplink = `${data.urls.memeBase}0`;
        }
      );
    }

  }

  loadData(){
    this.$http.get( this.data.urls.imageList ).then(
      (data) => {
        this.setThumbList(data.data);
      },
      (message, code) => {
        this.setThumbList(this.data.dummyList);
        this.$log.warn("$http error - getThumbList: Using dummy list -", message, code);
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
    let format = this.formatImageData;

    thumbList.splice(0,thumbList.length);
    let len = arr.length;
    for( let i = 0; i <  len; ++i ){
      let elem = arr[i];
      format(elem, baseUrl, memeBase);
      thumbList.push(elem);
    }
    let state = History.getState();
    if(state.hash.indexOf(memeBase) === -1 ){
      this.setCurrentTonyByData(thumbList[thumbList.length - 1]);
    }
  }

  formatImageData(obj,url,base){
    obj.url = obj.image;
    obj.deeplink = `${url}${obj.id}`;
    obj.pushState = `${base}${obj.id}`;
  }

  getCurrentTony(){
    return this.data.currentTony;
  }

  getTonyById(id){
    for(let tony of this.data.thumbList){
      if (tony.id === id){
        return tony;
      }
    }
    return undefined;
  }

  setCurrentTony(id){
    let tony = this.data.currentTony;
    let thumb = this.getTonyById(id);
    this.setCurrentTonyByData(thumb);
    let state = History.getState().hash.indexOf(this.data.urls.memeBase) === -1 ? tony.pushState : tony.id;

    History.pushState({id: `tony-${tony.id}`}, `${this.data.title}: ${tony.id}`, state.toString());
  }

  setCurrentTonyByData(tonyData){
    let tony = this.data.currentTony;
    tony.link = tonyData.url;
    tony.id = tonyData.id;
    tony.deeplink = tonyData.deeplink;
    tony.pushState = tonyData.pushState;
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
