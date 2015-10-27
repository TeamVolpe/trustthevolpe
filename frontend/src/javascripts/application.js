const TonyViewer = require("./controllers/TonyViewer");
const TonyFooter = require("./controllers/TonyFooter");
const TonyMaker = require("./controllers/TonyMaker");
const TonyDataService = require("./services/TonyDataService");
const LongPress = require("./directives/LongPress");

export default class Application{

  constructor(){
    angular.module("appVolpelator", ["ngDroplet"])
      .controller("TonyViewerController", ["TonyDataService", TonyViewer])
      .controller("TonyFooterController", ["TonyDataService", TonyFooter])
      .controller("TonyMakerController", ["TonyDataService","$scope", "$window", "$interval", TonyMaker])
      .service("TonyDataService", ["$http", "$q", "$log", TonyDataService])
      .directive("onLongPress", ["$interval", LongPress]);

    $(this.onDocReady);
  }

  onDocReady(){
    $("#credits").click(()=>{
      $("#techlead").modal("show");
    });
  }
}

var app = new Application();
