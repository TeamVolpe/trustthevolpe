export default class TonyMakerImageView {

  constructor($interval){
    this.$interval = $interval;
  }

  init(){
    this.images = {};
    this.fullPhotoBounds = { x: 240, y: 180, width: 414, height: 474, xRatio: 0, yRatio: 0 };
    this.internalCanvas = document.createElement("canvas");
    this.imageHolder = document.getElementById("loltony-holder");
    this.children = {};

    this.centerTextY = 0;
    this.twoLineTextY = 0;
    this.multiLineTextY = 0;

    this.imageHolder.addEventListener("dragstart",(evt)=>{
      evt.preventDefault();
    });

    this.initLoad();
  }

  initLoad(){
    let preload = new createjs.LoadQueue();

    preload.on("complete", () => {this.onFilesLoaded(preload); }, this);

    preload.loadManifest([
      {id:"trust", src: "images/loltony-trust-2x.png"},
      {id:"write", src: "images/loltony-write-2x.png"},
      {id:"overlay", src: "images/loltony-overlay-2x.png"},
      {id:"placeholder", src: "images/loltony-placeholder-2x.png"},
      {id:"base", src: "images/loltony-base-2x.png"}
    ]);
  }

  onFilesLoaded(preload){
    this.images.trust = preload.getResult("trust");
    this.images.write = preload.getResult("write");
    this.images.overlay = preload.getResult("overlay");
    this.images.placeholder = preload.getResult("placeholder");
    this.images.base = preload.getResult("base");

    this.initInternalCanvas();
  }

  initInternalCanvas(){
    let ic = this.internalCanvas;
    ic.width = this.images.overlay.width;
    ic.height = this.images.overlay.height;

    let bounds = this.fullPhotoBounds;
    bounds.xRatio = bounds.x/ic.width;
    bounds.yRatio = bounds.y/ic.height;

    this.stage = new createjs.Stage(ic);

    this.addChildren();
  }

  addChildren(){
    let stage = this.stage;
    let c = this.children;


    let placeholderImg = new createjs.Bitmap(this.images.placeholder);
    stage.addChild(placeholderImg);
    c.placeholderImg = placeholderImg;

    let baseImg = new createjs.Bitmap(this.images.base);
    stage.addChild(baseImg);
    baseImg.compositeOperation = "multiply";
    c.baseImg = baseImg;


    let overlayImg = new createjs.Bitmap(this.images.overlay);
    stage.addChild(overlayImg);
    c.overlayImg = overlayImg;

    let writeImg = new createjs.Bitmap(this.images.write);
    stage.addChild(writeImg);
    c.writeImg = writeImg;

    let trustImg = new createjs.Bitmap(this.images.trust);
    stage.addChild(trustImg);
    trustImg.visible = false;
    c.trustImg = trustImg;

    this.addText();


    this.update();
    this.initComplete = true;
  }

  update(){
    this.stage.update();
    this.imageHolder.src = this.internalCanvas.toDataURL("image/jpeg");
    //console.log("update");
  }

  reset(){
    if(this.initComplete){

      let c = this.children;
      c.writeImg.visible = true;
      c.placeholderImg.visible = true;
      c.text.visible = false;
      c.text.text = "";

      if(c.mainImg && this.stage.contains(c.mainImg)){
        this.stage.removeChild(c.mainImg);
        c.mainImg.image = null;
        c.mainImg = null;
        this.images.main = null;
      }

      this.update();
    }
  }

  addText(stage){
    let text = new createjs.Text("...", "38px GloriaHallelujah", "#000000");
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
    text.text = "";

    this.stage.addChild(text);
    this.children.text = text;
  }



  onTextFocus(){
    this.children.text.visible = true;
  }

  onTextChange(newText){
    let c = this.children;

    c.text.text = newText;
    c.text.visible = true;
    let lines = c.text.getMetrics().lines.length;
    if(lines > 2){
      c.text.y = this.multiLineTextY;
    }else if (lines == 2) {
      c.text.y = this.twoLineTextY;
    }else{
      c.text.y = this.centerTextY;
    }

    c.writeImg.visible = false;

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
    placeholder.visible = false;

    this.update();

    this.setDragHandler();

    return Math.ceil(scaler*100);
  }

  modifyMainImagePosition(x,y){
    this.children.mainImg.x += x;
    this.children.mainImg.y += y;
    //this.update();
  }

  setDragHandler(){
    let f = (evt) => {
      evt.stopPropagation();
      //evt.preventDefault();
      if(evt.type === "touchstart"){
        //evt.pageX = evt.originalEvent.changedTouches[0].pageX;
        //evt.pageY = evt.originalEvent.changedTouches[0].pageY;
        let tmp = {};

        tmp.pageX = evt.changedTouches[0].pageX;
        tmp.pageY = evt.changedTouches[0].pageY;
        this.touchEventCoords = {
          x: tmp.pageX,
          y: tmp.pageY
        };
        this.onEventBegin(tmp, "touchmove", "touchend" );
      }
      else{
        this.onEventBegin(evt, "mousemove", "mouseup");
      }
    };

    //let $image = $(this.imageHolder);
    //$image.on("touchstart", f);
    //$image.on("mousedown", f);
    this.imageHolder.addEventListener("touchstart", f, false);
    this.imageHolder.addEventListener("mousedown", f, false);
  }

  onEventBegin(evt, moveType, endType){
    if (this.isPointWithinBounds(evt)){
      // lower fps on mobile
      let framerate = moveType === "touchmove" ? 6 : 30;
      this.updateInterval = this.$interval( (args) => { this.update(); }, (1/framerate) );
      //console.log(evt);
      //let body = $("body");
      let body = document.getElementsByTagName("body")[0];
      let moveMouse = (event) => {
        this.modifyMainImagePosition(event.movementX, event.movementY);
      };
      let moveTouch = (event) => {
        event.stopPropagation();
        event.preventDefault();
        let old = this.touchEventCoords;
        //let x = event.originalEvent.changedTouches[0].pageX;
        //let y = event.originalEvent.changedTouches[0].pageY;
        let x = event.changedTouches[0].pageX;
        let y = event.changedTouches[0].pageY;
        let tmp = {};
        tmp.movementX = x - old.x;
        tmp.movementY = y - old.y;
        old.x = x;
        old.y = y;
        moveMouse(tmp);
      };
      let move = moveType === "touchmove" ? moveTouch : moveMouse;
      let end = (event)=> {
        event.stopPropagation();
        event.preventDefault();
        this.$interval.cancel(this.updateInterval);
        //body.off(moveType, move);
        //body.off(endType, end);
        body.removeEventListener(moveType, move, false);
        body.removeEventListener(endType, end, false);
        this.touchEventCoords = null;
      };
      //body.on(moveType, move);
      //body.on(endType, end);
      body.addEventListener(moveType, move, false);
      body.addEventListener(endType, end, false);
    }
  }

  isPointWithinBounds(evt){
    let image = this.imageHolder;
    let bounds = this.fullPhotoBounds;

    let local = this.globalToLocal($(image),evt.pageX,evt.pageY);

    let xRatio = local.x/image.width;
    let yRatio = local.y/image.height;

    return xRatio >= bounds.xRatio && yRatio >= bounds.yRatio;
  }

  globalToLocal( context, globalX, globalY ){
      let position = context.offset();
      return({
        x: Math.floor( globalX - position.left ),
        y: Math.floor( globalY - position.top )
      });
  }

  getCanvasData(){
    this.children.trustImg.visible = true;
    this.stage.update();
    let data = this.internalCanvas.toDataURL("image/jpeg");

    this.children.trustImg.visible = false;
    this.stage.update();

    return data;
  }

}
