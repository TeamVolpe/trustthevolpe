export default class TonyFooter{

  constructor(tonyDataService){
    this.tonyDataService = tonyDataService;

    this.initStrings();
    this.init();
  }

  initStrings(){
    let strings = {};
    strings.title = "LOOK AT SOME TONIES";
    this.strings = strings;
  }

  init(){
    let data = {};
    data.thumbList = this.tonyDataService.getThumbList();

    this.data = data;
  }

  onThumbClick(id){
    console.log("click", id);
    this.tonyDataService.setCurrentTony(id);
    //window.scrollTo(0,0);
    $("body").animate({"scrollTop": 0 }, "swing");
  }

  onReady(){
    //console.log('DOM ready');
  }

}
