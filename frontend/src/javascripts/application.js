const LolTony = require("./loltony.js");

export default class Application{

  constructor(){
    this.lolTonyOverlay = new LolTony( document.getElementById("tonymaker-overlay") );
    this.init();
  }

  init(){
    const closeButtons = document.getElementsByClassName("overlay-close");
    for (let i = 0; i < closeButtons.length; ++i){
      let btn = closeButtons[i];
      btn.addEventListener("click", this.closeOpenOverlay);
    }

    const makeBtn = document.getElementsByClassName("make-a-tony")[0];
    makeBtn.addEventListener("click", this.showNewOverlay);
  }

  closeOpenOverlay(){
    const overlays = document.getElementsByClassName("overlay");
    for (let i = 0; i < overlays.length; ++i){
      if(overlays[i].className != "overlay overlay-invisible"){
        overlays[i].className = "overlay overlay-invisible";
      }
    }
  }

  showNewOverlay(){
    let overlay = document.getElementById("tonymaker-overlay");
    overlay.className = "overlay overlay-visible";
  }

}
