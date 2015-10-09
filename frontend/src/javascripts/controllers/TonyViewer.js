export default class TonyViewer{

  constructor(tonyDataService){
    this.tonyDataService = tonyDataService;
    this.setDefaultStrings();
    this.setDefaultImage();
    this.setInteraction();


  }

  setDefaultStrings(){
    let strings = {};
    strings.makeTony = "MAKE A TONY";
    strings.copyTony = "LINK THIS TONY";

    this.strings = strings;
  }

  setDefaultImage(){
    this.currentImage = this.tonyDataService.getCurrentTony();
  }

  setInteraction(){
    $("[data-toggle='popover']").popover();
  }

  onMakeTony(){
    console.log("make");
  }

  onCopyTony(){
    console.log("copy",  $(".popover-content").html());
    let elem = $(".popover-content")[0];
    //let elem = $(".link-a-tony")[0];
    if (document.selection) {
      console.log("if", elem);
      let range = document.body.createTextRange();
      range.moveToElementText(elem);
      range.select();
    } else if (window.getSelection) {
      console.log("else", elem);
      let range = document.createRange();
      range.selectNodeContents(elem);
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      console.log(window.getSelection());
    }

  }


}
