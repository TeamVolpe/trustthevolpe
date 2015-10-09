webpackJsonp([0,1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LolTony = __webpack_require__(2);
	var TonyViewer = __webpack_require__(3);
	var TonyFooter = __webpack_require__(4);
	var TonyMaker = __webpack_require__(5);
	var TonyDataService = __webpack_require__(6);
	var LongPress = __webpack_require__(7);
	
	var Application = function Application() {
	  _classCallCheck(this, Application);
	
	  angular.module("appVolpelator", ["ngDroplet"]).controller("TonyViewerController", ["TonyDataService", TonyViewer]).controller("TonyFooterController", ["TonyDataService", TonyFooter]).controller("TonyMakerController", ["$scope", "$window", TonyMaker]).service("TonyDataService", ["$http", "$q", "$log", TonyDataService]).directive("onLongPress", ["$interval", LongPress]);
	};
	
	exports["default"] = Application;
	
	var app = new Application();
	module.exports = exports["default"];

/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LolTony = (function () {
	  function LolTony(elem) {
	    _classCallCheck(this, LolTony);
	
	    this.rootElement = elem;
	    this.init();
	  }
	
	  _createClass(LolTony, [{
	    key: "init",
	    value: function init() {
	      this.canvas = this.rootElement.getElementsByTagName("canvas")[0];
	      this.initLoad();
	    }
	  }, {
	    key: "initLoad",
	    value: function initLoad() {
	      this.preload = new createjs.LoadQueue();
	      var preload = this.preload;
	      preload.on("complete", this.onFilesLoaded, this);
	      preload.loadManifest([{ id: "trust", src: "images/loltony-trust-2x.png" }, { id: "write", src: "images/loltony-write-2x.png" }, { id: "overlay", src: "images/loltony-overlay-2x.png" }, { id: "placeholder", src: "images/loltony-placeholder-2x.png" }, { id: "base", src: "images/loltony-base-2x.png" }]);
	    }
	  }, {
	    key: "onFilesLoaded",
	    value: function onFilesLoaded() {
	      var preload = this.preload;
	      this.images = {};
	      this.images.trust = preload.getResult("trust");
	      this.images.write = preload.getResult("write");
	      this.images.overlay = preload.getResult("overlay");
	      this.images.placeholder = preload.getResult("placeholder");
	      this.images.base = preload.getResult("base");
	
	      this.initInternalCanvas();
	    }
	  }, {
	    key: "initInternalCanvas",
	    value: function initInternalCanvas() {
	      this.internalCanvas = document.createElement("canvas");
	      var ic = this.internalCanvas;
	      this.internalContext = ic.getContext("2d");
	      ic.width = this.images.overlay.width;
	      ic.height = this.images.overlay.height;
	      var stage = new createjs.Stage(ic);
	
	      var baseImg = new createjs.Bitmap(this.images.base);
	      var placeholderImg = new createjs.Bitmap(this.images.placeholder);
	      var overlayImg = new createjs.Bitmap(this.images.overlay);
	      var writeImg = new createjs.Bitmap(this.images.write);
	      var trustImg = new createjs.Bitmap(this.images.trust);
	
	      stage.addChild(baseImg);
	      stage.addChild(placeholderImg);
	      stage.addChild(overlayImg);
	      stage.addChild(writeImg);
	      //stage.addChild(trustImg);
	      this.addText(stage);
	
	      stage.update();
	
	      var placeholder = document.getElementById("loltony-holder");
	      placeholder.src = ic.toDataURL("image/png");
	    }
	  }, {
	    key: "addText",
	    value: function addText(stage) {
	      var text = new createjs.Text("Hello World HI HI Hi Hi Hi Hello World HI HI Hi Hi Hi", "40px GloriaHallelujah", "#000000");
	      text.textAlign = "center";
	      text.maxWidth = this.internalCanvas.width * 0.50;
	      text.text = "Hello World";
	      //text.x = 100;
	      text.x = this.internalCanvas.width * 0.70;
	      text.y = (this.internalCanvas.height * 0.3 - text.getBounds().height) * 0.5;
	      stage.addChild(text);
	    }
	  }]);
	
	  return LolTony;
	})();
	
	exports["default"] = LolTony;
	module.exports = exports["default"];

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyViewer = (function () {
	  function TonyViewer(tonyDataService) {
	    _classCallCheck(this, TonyViewer);
	
	    this.tonyDataService = tonyDataService;
	    this.setDefaultStrings();
	    this.setDefaultImage();
	    this.setInteraction();
	  }
	
	  _createClass(TonyViewer, [{
	    key: "setDefaultStrings",
	    value: function setDefaultStrings() {
	      var strings = {};
	      strings.makeTony = "MAKE A TONY";
	      strings.copyTony = "LINK THIS TONY";
	
	      this.strings = strings;
	    }
	  }, {
	    key: "setDefaultImage",
	    value: function setDefaultImage() {
	      this.currentImage = this.tonyDataService.getCurrentTony();
	    }
	  }, {
	    key: "setInteraction",
	    value: function setInteraction() {
	      $("[data-toggle='popover']").popover();
	    }
	  }, {
	    key: "onMakeTony",
	    value: function onMakeTony() {
	      console.log("make");
	    }
	  }, {
	    key: "onCopyTony",
	    value: function onCopyTony() {
	      console.log("copy", $(".popover-content").html());
	      var elem = $(".popover-content")[0];
	      //let elem = $(".link-a-tony")[0];
	      if (document.selection) {
	        console.log("if", elem);
	        var range = document.body.createTextRange();
	        range.moveToElementText(elem);
	        range.select();
	      } else if (window.getSelection) {
	        console.log("else", elem);
	        var range = document.createRange();
	        range.selectNodeContents(elem);
	        window.getSelection().removeAllRanges();
	        window.getSelection().addRange(range);
	        console.log(window.getSelection());
	      }
	    }
	  }]);
	
	  return TonyViewer;
	})();
	
	exports["default"] = TonyViewer;
	module.exports = exports["default"];

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyFooter = (function () {
	  function TonyFooter(tonyDataService) {
	    _classCallCheck(this, TonyFooter);
	
	    this.tonyDataService = tonyDataService;
	
	    this.initStrings();
	    this.init();
	  }
	
	  _createClass(TonyFooter, [{
	    key: "initStrings",
	    value: function initStrings() {
	      var strings = {};
	      strings.title = "LOOK AT SOME TONIES";
	      this.strings = strings;
	    }
	  }, {
	    key: "init",
	    value: function init() {
	      var data = {};
	      data.thumbList = this.tonyDataService.getThumbList();
	
	      this.data = data;
	    }
	  }, {
	    key: "onThumbClick",
	    value: function onThumbClick(id) {
	      console.log("click", id);
	      this.tonyDataService.setCurrentTony(id);
	      //window.scrollTo(0,0);
	      $("body").animate({ "scrollTop": 0 }, "swing");
	    }
	  }, {
	    key: "onReady",
	    value: function onReady() {
	      //console.log('DOM ready');
	    }
	  }]);
	
	  return TonyFooter;
	})();
	
	exports["default"] = TonyFooter;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyMakerImageView = __webpack_require__(8);
	
	var TonyMaker = (function () {
	  function TonyMaker($scope, $window) {
	    _classCallCheck(this, TonyMaker);
	
	    this.$scope = $scope;
	    this.$window = $window;
	
	    this.photoScale = 100;
	    this.dragDropInterface = {};
	    this.hasImage = false;
	
	    this.imageView = new TonyMakerImageView();
	
	    this.init();
	  }
	
	  _createClass(TonyMaker, [{
	    key: "init",
	    value: function init() {
	      this.initDragAndDrop();
	      this.imageView.init();
	      //this.initLoad();
	    }
	  }, {
	    key: "initDragAndDrop",
	    value: function initDragAndDrop() {
	      var _this = this;
	
	      var $scope = this.$scope;
	      $scope.$on("$dropletReady", function () {
	        _this.dragDropInterface.allowedExtensions(["png", "jpg", "bmp", "gif", "svg"]);
	      });
	
	      $scope.$on("$dropletFileAdded", function (evt, data) {
	        _this.addMainImageFromFile(data.file);
	      });
	    }
	  }, {
	    key: "editText",
	    value: function editText() {
	      var elem = document.getElementById("tonytext");
	      elem.style.visibility = "visible";
	      this.imageView.editText();
	      elem.focus();
	    }
	  }, {
	    key: "onTextChange",
	    value: function onTextChange() {
	      this.imageView.onTextChange(this.tonyText);
	    }
	  }, {
	    key: "onTextBlur",
	    value: function onTextBlur() {
	      document.getElementById("tonytext").style.visibility = "hidden";
	    }
	  }, {
	    key: "onScaleChange",
	    value: function onScaleChange(amt) {
	      this.photoScale += amt;
	      this.imageView.onScaleChange(this.photoScale);
	    }
	  }, {
	    key: "addMainImageFromFile",
	    value: function addMainImageFromFile(file) {
	      var _this2 = this;
	
	      var img = new Image();
	
	      img.addEventListener("load", function () {
	        _this2.photoScale = _this2.imageView.setMainImage(img);
	        _this2.hasImage = true;
	        _this2.$scope.$apply();
	      });
	
	      img.src = window.URL.createObjectURL(file);
	    }
	  }]);
	
	  return TonyMaker;
	})();
	
	exports["default"] = TonyMaker;
	module.exports = exports["default"];

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyDataService = (function () {
	  function TonyDataService($http, $q, $log) {
	    _classCallCheck(this, TonyDataService);
	
	    this.$http = $http;
	    this.$q = $q;
	    this.$log = $log;
	    this.init();
	    this.loadData();
	  }
	
	  _createClass(TonyDataService, [{
	    key: "init",
	    value: function init() {
	      var data = {};
	
	      data.currentTony = {
	        link: "images/meme-2x.jpg",
	        id: "tony-1138",
	        deeplink: location.href + "0"
	      };
	
	      var dummyList = [];
	      for (var i = 0; i < 42; ++i) {
	        dummyList.push({ url: "/images/meme-2x.jpg", id: "tony-1138-" + i, deeplink: "" + location.href + i });
	      }
	      data.dummyList = dummyList;
	
	      var thumbList = [];
	      data.thumbList = thumbList;
	
	      var urls = {};
	      urls.imageList = "api/list";
	      data.urls = urls;
	
	      this.data = data;
	    }
	  }, {
	    key: "loadData",
	    value: function loadData() {
	      var _this = this;
	
	      this.$http.get(this.data.urls.imageList).then(function (data) {
	        //this.data.thumbList = data.data;
	        _this.setThumbList(data.data);
	        //return this.data.thumbList;
	      }, function (message, code) {
	        _this.setThumbList(_this.data.dummyList);
	        //this.data.thumbList = this.data.dummyList;
	        _this.$log.warn("$http error - getThumbList: Using dummy list -", message, code);
	        //return this.data.thumbList;
	      });
	    }
	  }, {
	    key: "getThumbList",
	    value: function getThumbList() {
	      return this.data.thumbList;
	    }
	  }, {
	    key: "setThumbList",
	    value: function setThumbList(arr) {
	      var thumbList = this.data.thumbList;
	      thumbList.splice(0, thumbList.length);
	      var len = arr.length;
	      for (var i = 0; i < len; ++i) {
	        var elem = arr[i];
	        thumbList.push(elem);
	      }
	    }
	
	    /*
	      getThumbList(){
	        let promise;
	    
	        if (this.data.thumbList.length === 0){
	          promise = this.$http.get( this.data.urls.imageList).then(
	            (data) => {
	              this.data.thumbList = data.data;
	              return this.data.thumbList;
	            },
	            (message, code) => {
	              this.data.thumbList = this.data.dummyList;
	              this.$log.error("$http error - getThumbList: Using dummy list -", message, code);
	              return this.data.thumbList;
	            }
	          );
	        }else{
	          let deferred = this.$q.defer();
	          deferred.resolve(this.data.thumbList);
	          promise = deferred.promise;
	        }
	    
	        return promise;
	      }
	    */
	  }, {
	    key: "getCurrentTony",
	    value: function getCurrentTony() {
	      return this.data.currentTony;
	    }
	  }, {
	    key: "setCurrentTony",
	    value: function setCurrentTony(id) {
	      var tony = this.data.currentTony;
	      var thumb = this.data.thumbList[id];
	      tony.link = thumb.link;
	      tony.id = thumb.id;
	      tony.deeplink = thumb.deeplink;
	    }
	  }]);
	
	  return TonyDataService;
	})();
	
	exports["default"] = TonyDataService;
	module.exports = exports["default"];

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	exports["default"] = function ($interval) {
	  return {
	    restrict: "A",
	    link: function link($scope, $elm, $attrs) {
	
	      var mouseDown = function mouseDown(evt) {
	        evt.preventDefault();
	        $scope.longPressInterval = $interval(function () {
	          console.log("longpress");
	          $scope.$eval($attrs.onLongPress);
	        }, 300);
	      };
	
	      var mouseUp = function mouseUp(evt) {
	        evt.preventDefault();
	        $interval.cancel($scope.longPressInterval);
	        if ($attrs.onTouchEnd) {
	          $scope.$eval($attrs.onTouchEnd);
	        }
	      };
	
	      $elm.bind("mousedown", mouseDown);
	      $elm.bind("touchstart", mouseDown);
	
	      $elm.bind("mouseup", mouseUp);
	      $elm.bind("mouseleave", mouseUp);
	      $elm.bind("touchend", mouseUp);
	      $elm.bind("touchleave", mouseUp);
	    }
	  };
	};
	
	module.exports = exports["default"];

/***/ },
/* 8 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyMakerImageView = (function () {
	  function TonyMakerImageView() {
	    _classCallCheck(this, TonyMakerImageView);
	
	    this.fullPhotoBounds = {
	      x: 240,
	      y: 180,
	      width: 414,
	      height: 474
	    };
	  }
	
	  _createClass(TonyMakerImageView, [{
	    key: "init",
	    value: function init() {
	      this.initLoad();
	    }
	  }, {
	    key: "initLoad",
	    value: function initLoad() {
	      this.preload = new createjs.LoadQueue();
	      var preload = this.preload;
	      preload.on("complete", this.onFilesLoaded, this);
	      preload.loadManifest([{ id: "trust", src: "images/loltony-trust-2x.png" }, { id: "write", src: "images/loltony-write-2x.png" }, { id: "overlay", src: "images/loltony-overlay-2x.png" }, { id: "placeholder", src: "images/loltony-placeholder-2x.png" }, { id: "base", src: "images/loltony-base-2x.png" }]);
	    }
	  }, {
	    key: "onFilesLoaded",
	    value: function onFilesLoaded() {
	      var preload = this.preload;
	      this.images = {};
	      this.images.trust = preload.getResult("trust");
	      this.images.write = preload.getResult("write");
	      this.images.overlay = preload.getResult("overlay");
	      this.images.placeholder = preload.getResult("placeholder");
	      this.images.base = preload.getResult("base");
	
	      this.initInternalCanvas();
	    }
	  }, {
	    key: "initInternalCanvas",
	    value: function initInternalCanvas() {
	      this.internalCanvas = document.createElement("canvas");
	      var ic = this.internalCanvas;
	      this.internalContext = ic.getContext("2d");
	      ic.width = this.images.overlay.width;
	      ic.height = this.images.overlay.height;
	      var stage = new createjs.Stage(ic);
	
	      var baseImg = new createjs.Bitmap(this.images.base);
	      var placeholderImg = new createjs.Bitmap(this.images.placeholder);
	      var overlayImg = new createjs.Bitmap(this.images.overlay);
	      var writeImg = new createjs.Bitmap(this.images.write);
	      var trustImg = new createjs.Bitmap(this.images.trust);
	
	      baseImg.compositeOperation = "multiply";
	
	      stage.addChild(placeholderImg);
	      stage.addChild(baseImg);
	      stage.addChild(overlayImg);
	      stage.addChild(writeImg);
	      //stage.addChild(trustImg);
	      var text = this.addText(stage);
	
	      this.children = {};
	      var c = this.children;
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
	  }, {
	    key: "addText",
	    value: function addText(stage) {
	      var text = new createjs.Text("WRITE FUNNY", "40px GloriaHallelujah", "#000000");
	      text.textAlign = "center";
	      text.lineWidth = this.internalCanvas.width * 0.63;
	      //text.text = this.tonyText;
	      //text.x = 100;
	      text.x = this.internalCanvas.width * 0.68;
	      text.y = (this.internalCanvas.height * 0.3 - text.getBounds().height) * 0.5;
	      text.rotation = -2;
	      text.visible = false;
	
	      this.centerTextY = text.y;
	      this.twoLineTextY = (this.internalCanvas.height * 0.3 - text.getBounds().height * 2) * 0.5;
	      this.multiLineTextY = (this.internalCanvas.height * 0.3 - text.getBounds().height * 3) * 0.5;
	
	      stage.addChild(text);
	      return text;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      var ic = this.internalCanvas;
	
	      this.stage.update();
	      this.placeholder.src = ic.toDataURL("image/jpeg");
	    }
	  }, {
	    key: "editText",
	    value: function editText() {
	      this.children.text.visible = true;
	    }
	  }, {
	    key: "onTextChange",
	    value: function onTextChange(newText) {
	      var c = this.children;
	
	      c.text.text = newText;
	      var lines = c.text.getMetrics().lines.length;
	      if (lines > 2) {
	        c.text.y = this.multiLineTextY;
	      } else if (lines == 2) {
	        c.text.y = this.twoLineTextY;
	      } else {
	        c.text.y = this.centerTextY;
	      }
	
	      if (this.stage.contains(c.writeImg)) {
	        this.stage.removeChild(c.writeImg);
	      }
	
	      this.update();
	    }
	  }, {
	    key: "onScaleChange",
	    value: function onScaleChange(amt) {
	      var img = this.children.mainImg;
	      if (img) {
	        img.scaleX = img.scaleY = amt * 0.01;
	        this.update();
	      }
	    }
	  }, {
	    key: "setMainImage",
	    value: function setMainImage(img) {
	      var stage = this.stage;
	      var placeholder = this.children.placeholderImg;
	      var bounds = this.fullPhotoBounds;
	      var mainImage = new createjs.Bitmap(img);
	
	      this.images.main = img;
	      this.children.mainImg = mainImage;
	      mainImage.x = bounds.x;
	      mainImage.y = bounds.y;
	
	      var w = mainImage.image.naturalWidth / bounds.width;
	      var h = mainImage.image.naturalHeight / bounds.height;
	      var scaler = w < h ? 1 / w : 1 / h;
	
	      mainImage.scaleX = mainImage.scaleY = scaler;
	
	      stage.addChildAt(mainImage, 0);
	      if (stage.contains(placeholder)) {
	        stage.removeChild(placeholder);
	      }
	
	      this.update();
	
	      return Math.ceil(scaler * 100);
	    }
	  }]);
	
	  return TonyMakerImageView;
	})();
	
	exports["default"] = TonyMakerImageView;
	module.exports = exports["default"];

/***/ }
]);
//# sourceMappingURL=application.js.map