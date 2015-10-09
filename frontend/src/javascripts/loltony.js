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
      {id:"trust", src: "images/loltony-trust-2x.png"},
      {id:"write", src: "images/loltony-write-2x.png"},
      {id:"overlay", src: "images/loltony-overlay-2x.png"},
      {id:"placeholder", src: "images/loltony-placeholder-2x.png"},
      {id:"base", src: "images/loltony-base-2x.png"}
    ]);
  }

  onFilesLoaded(){
    let preload = this.preload;
    this.images = {};
    this.images.trust = preload.getResult("trust");
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
    let trustImg = new createjs.Bitmap(this.images.trust);

    stage.addChild(baseImg);
    stage.addChild(placeholderImg);
    stage.addChild(overlayImg);
    stage.addChild(writeImg);
    //stage.addChild(trustImg);
    this.addText(stage);

    stage.update();

    let placeholder = document.getElementById("loltony-holder");
    placeholder.src = ic.toDataURL("image/png");

  }

  addText(stage){
    let text = new createjs.Text("Hello World HI HI Hi Hi Hi Hello World HI HI Hi Hi Hi", "40px GloriaHallelujah", "#000000");
    text.textAlign = "center";
    text.maxWidth = this.internalCanvas.width*0.50;
    text.text = "Hello World";
    //text.x = 100;
    text.x = this.internalCanvas.width*0.70;
    text.y = (this.internalCanvas.height*0.3 - text.getBounds().height)*0.5;
    stage.addChild(text);
  }

}
