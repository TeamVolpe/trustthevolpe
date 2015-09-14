export default class LolTony {
  constructor(elem){
    this.rootElement = elem;
    this.init();
  }

  init(){
    this.canvas = this.rootElement.getElementsByTagName("canvas")[0];
    this.initLoad();
  }

  initLoad(){
    this.preload = new createjs.LoadQueue();
    let preload = this.preload;
    preload.on("complete", this.onFilesLoaded, this);
    preload.loadManifest([
      {id:"write", src: "images/loltony-write-2x.png"},
      {id:"overlay", src: "images/loltony-overlay-2x.png"},
      {id:"placeholder", src: "images/loltony-placeholder-2x.png"},
      {id:"base", src: "images/loltony-base-2x.png"}
    ]);
  }

  onFilesLoaded(){
    let preload = this.preload;
    this.images = {};
    this.images.write = preload.getResult("write");
    this.images.overlay = preload.getResult("overlay");
    this.images.placeholder = preload.getResult("placeholder");
    this.images.base = preload.getResult("base");

    this.initInternalCanvas();
  }

  initInternalCanvas(){
    this.internalCanvas = document.createElement("canvas");
    let ic = this.internalCanvas;
    this.internalContext = ic.getContext("2d");
    ic.width = this.images.overlay.width;
    ic.height = this.images.overlay.height;
    let stage = new createjs.Stage(ic);

    let baseImg = new createjs.Bitmap(this.images.base);
    let placeholderImg = new createjs.Bitmap(this.images.placeholder);
    let overlayImg = new createjs.Bitmap(this.images.overlay);
    let writeImg = new createjs.Bitmap(this.images.write);

    stage.addChild(baseImg);
    stage.addChild(placeholderImg);
    stage.addChild(overlayImg);
    stage.addChild(writeImg);

    stage.update();

    let placeholder = document.getElementById("loltony-holder");
    placeholder.src = ic.toDataURL("image/png");

  }

}
