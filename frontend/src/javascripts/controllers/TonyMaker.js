const TonyMakerImageView = require("./TonyMakerImageView");

export default class TonyMaker {

  constructor($scope, $window){

    this.$scope = $scope;
    this.$window = $window;

    this.photoScale = 100;
    this.dragDropInterface = {};
    this.hasImage = false;


    this.imageView = new TonyMakerImageView();

    this.init();
  }

  init(){
    this.initDragAndDrop();
    this.imageView.init();
    //this.initLoad();
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

  editText(){
    let elem =  document.getElementById("tonytext");
    elem.style.visibility = "visible";
    this.imageView.editText();
    elem.focus();
  }

  onTextChange(){
    this.imageView.onTextChange(this.tonyText);
  }

  onTextBlur(){
    document.getElementById("tonytext").style.visibility = "hidden";
  }

  onScaleChange(amt){
    this.photoScale += amt;
    this.imageView.onScaleChange(this.photoScale);
  }

  addMainImageFromFile(file){
    let img = new Image();

    img.addEventListener("load", ()=> {
      this.photoScale = this.imageView.setMainImage(img);
      this.hasImage = true;
      this.$scope.$apply();
    });


    img.src = window.URL.createObjectURL(file);
  }

}
