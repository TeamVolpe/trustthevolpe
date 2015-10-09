export default class TonyMakerImageView {

  constructor(){

    this.fullPhotoBounds = {
      x: 240,
      y: 180,
      width: 414,
      height: 474
    };

  }

  init(){
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

    baseImg.compositeOperation = "multiply";

    stage.addChild(placeholderImg);
    stage.addChild(baseImg);
    stage.addChild(overlayImg);
    stage.addChild(writeImg);
    //stage.addChild(trustImg);
    let text = this.addText(stage);


    this.children = {};
    let c = this.children;
    c.text = text;
    c.baseImg = baseImg;
    c.placeholderImg = placeholderImg;
    c.overlayImg = overlayImg;
    c.writeImg = writeImg;
    c.trustImg = trustImg;


    this.placeholder = document.getElementById("loltony-holder");
    this.stage = stage;

    this.update();
  }

  addText(stage){
    let text = new createjs.Text("WRITE FUNNY", "40px GloriaHallelujah", "#000000");
    text.textAlign = "center";
    text.lineWidth = this.internalCanvas.width*0.63;
    //text.text = this.tonyText;
    //text.x = 100;
    text.x = this.internalCanvas.width*0.68;
    text.y = (this.internalCanvas.height*0.3 - text.getBounds().height)*0.5;
    text.rotation = -2;
    text.visible = false;

    this.centerTextY = text.y;
    this.twoLineTextY = (this.internalCanvas.height*0.3 - text.getBounds().height*2)*0.5;
    this.multiLineTextY = (this.internalCanvas.height*0.3 - text.getBounds().height*3)*0.5;

    stage.addChild(text);
    return text;
  }


  update(){
    let ic = this.internalCanvas;

    this.stage.update();
    this.placeholder.src = ic.toDataURL("image/jpeg");
  }

  editText(){
    this.children.text.visible = true;
  }

  onTextChange(newText){
    let c = this.children;

    c.text.text = newText;
    let lines = c.text.getMetrics().lines.length;
    if(lines > 2){
      c.text.y = this.multiLineTextY;
    }else if (lines == 2) {
      c.text.y = this.twoLineTextY;
    }else{
      c.text.y = this.centerTextY;
    }

    if(this.stage.contains(c.writeImg)){
      this.stage.removeChild(c.writeImg);
    }

    this.update();
  }

  onScaleChange(amt){
    let img = this.children.mainImg;
    if(img){
      img.scaleX = img.scaleY = amt*0.01;
      this.update();
    }
  }

  setMainImage(img){
    let stage = this.stage;
    let placeholder = this.children.placeholderImg;
    let bounds = this.fullPhotoBounds;
    let mainImage = new createjs.Bitmap(img);

    this.images.main = img;
    this.children.mainImg = mainImage;
    mainImage.x = bounds.x;
    mainImage.y = bounds.y;

    let w = mainImage.image.naturalWidth / bounds.width;
    let h = mainImage.image.naturalHeight / bounds.height;
    let scaler = (w < h) ? 1/w : 1/h;

    mainImage.scaleX = mainImage.scaleY = scaler;

    stage.addChildAt(mainImage,0);
    if(stage.contains(placeholder)){
      stage.removeChild(placeholder);
    }

    this.update();

    return Math.ceil(scaler*100);
  }

}
