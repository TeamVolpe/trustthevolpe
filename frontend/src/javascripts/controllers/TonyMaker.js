const TonyMakerImageView = require("./TonyMakerImageView");

export default class TonyMaker {

  constructor(tonyDataService, $scope, $window, $interval){

    this.$scope = $scope;
    this.$window = $window;
    this.$interval = $interval;
    this.tonyDataService = tonyDataService;

    this.dragDropInterface = {};


    this.textId = "tonytext";


    this.imageView = new TonyMakerImageView($interval);

    this.reset();

    this.init();
  }

  init(){
    this.initDragAndDrop();
    this.initFileSelect();
    this.imageView.init();
    this.onTextBlur();
  }

  reset(){

    this.photoScale = 100;
    this.hasImage = false;
    this.hasText = false;
    this.enableSave();

    document.getElementById(this.textId).value = "";

    this.imageView.reset();
  }

  initDragAndDrop(){
    let $scope = this.$scope;
    $scope.$on("$dropletReady", () => {
      this.dragDropInterface.allowedExtensions(["png", "jpg", "bmp", "gif", "svg"]);
    });

    $scope.$on("$dropletFileAdded", (evt, data) => {
      this.addMainImageFromFile(data.file);
    });
  }

  initFileSelect(){
    let elem = document.getElementById("loltony-file-select");
    //let elem = document.createElement("input");
    elem.setAttribute("type", "file");
    elem.setAttribute("accepts", "image/*");
    elem.setAttribute("multiple", false);

    elem.addEventListener("change",  () => {
      this.addMainImageFromFile(elem.files[0]);
    });

    this.fileSelectElem = elem;
  }

  onSelectFile(){
    this.fileSelectElem.value = null;
    this.fileSelectElem.click();
    /*
    let evt = document.createEvent("MouseEvents");
    evt.initEvent("click", true, false);
    this.fileSelectElem.dispatchEvent(evt);
    //*/
  }

  addMainImageFromFile(file){
    let img = new Image();

    img.addEventListener("load", ()=> {
      this.photoScale = this.imageView.setMainImage(img);
      this.hasImage = true;
      this.enableSave();
      this.$scope.$apply();
    });

    img.src = this.$window.URL.createObjectURL(file);
  }

  enableSave(){
    if(this.hasText && this.hasImage){
      this.canSave = "enabled";
    }else{
      this.canSave = "disabled";
    }
  }


  setTextFocus(){
    let elem = document.getElementById(this.textId);
    elem.style.visibility = "visible";
    elem.focus();
  }

  onTextFocus(){
    this.imageView.onTextFocus();

  }

  onTextChange(){
    this.hasText = true;
    this.enableSave();
    this.imageView.onTextChange(this.tonyText);
  }

  onTextBlur(){
    document.getElementById(this.textId).style.visibility = "hidden";
  }

  onScaleChange(amt){
    this.photoScale += amt;
    this.imageView.onScaleChange(this.photoScale);
  }

  onSaveImage(){
    if(this.canSave === "enabled"){
      this.canSave = "disabled";
      let data = this.imageView.getCanvasData();
      this.tonyDataService.uploadTony(data, (msg, resp) => {
        console.log(msg,resp);
        if(msg === "success"){
          this.showSuccessOverlay();
        }else{
          this.showErrorOverlay();
        }
      });
      //console.log(data);
    }
  }

  showErrorOverlay(){
    this.enableSave();
    $("#tonymaker-overlay").modal("hide");
    $("#tonymaker-error").modal("show").on("hide.bs.modal",()=>{
      $("#tonymaker-overlay").modal("show");
    });
  }

  showSuccessOverlay(){
    this.enableSave();
    $("#tonymaker-overlay").modal("hide");
    $("#tonymaker-success").modal("show");
  }

}
