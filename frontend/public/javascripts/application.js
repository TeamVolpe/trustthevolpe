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
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyViewer = __webpack_require__(2);
	var TonyFooter = __webpack_require__(3);
	var TonyMaker = __webpack_require__(4);
	var TonyDataService = __webpack_require__(6);
	var LongPress = __webpack_require__(7);
	
	var Application = (function () {
	  function Application() {
	    _classCallCheck(this, Application);
	
	    angular.module("appVolpelator", ["ngDroplet"]).controller("TonyViewerController", ["TonyDataService", TonyViewer]).controller("TonyFooterController", ["TonyDataService", TonyFooter]).controller("TonyMakerController", ["TonyDataService", "$scope", "$window", "$interval", TonyMaker]).service("TonyDataService", ["$http", "$q", "$log", "$document", TonyDataService]).directive("onLongPress", ["$interval", LongPress]);
	
	    $(this.onDocReady);
	  }
	
	  _createClass(Application, [{
	    key: "onDocReady",
	    value: function onDocReady() {
	      $("#credits").click(function () {
	        $("#techlead").modal("show");
	      });
	    }
	  }]);
	
	  return Application;
	})();
	
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
/* 3 */
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
	      //console.log("click", id);
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
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyMakerImageView = __webpack_require__(5);
	
	var TonyMaker = (function () {
	  function TonyMaker(tonyDataService, $scope, $window, $interval) {
	    _classCallCheck(this, TonyMaker);
	
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
	
	  _createClass(TonyMaker, [{
	    key: "init",
	    value: function init() {
	      this.initDragAndDrop();
	      this.initFileSelect();
	      this.imageView.init();
	      this.onTextBlur();
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	
	      this.photoScale = 100;
	      this.hasImage = false;
	      this.hasText = false;
	      this.enableSave();
	
	      document.getElementById(this.textId).value = "";
	
	      this.imageView.reset();
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
	    key: "initFileSelect",
	    value: function initFileSelect() {
	      var _this2 = this;
	
	      var elem = document.getElementById("loltony-file-select");
	      //let elem = document.createElement("input");
	      elem.setAttribute("type", "file");
	      elem.setAttribute("accepts", "image/*");
	      elem.setAttribute("multiple", false);
	
	      elem.addEventListener("change", function () {
	        _this2.addMainImageFromFile(elem.files[0]);
	      });
	
	      this.fileSelectElem = elem;
	    }
	  }, {
	    key: "onSelectFile",
	    value: function onSelectFile() {
	      this.fileSelectElem.value = null;
	      this.fileSelectElem.click();
	      /*
	      let evt = document.createEvent("MouseEvents");
	      evt.initEvent("click", true, false);
	      this.fileSelectElem.dispatchEvent(evt);
	      //*/
	    }
	  }, {
	    key: "addMainImageFromFile",
	    value: function addMainImageFromFile(file) {
	      var _this3 = this;
	
	      var img = new Image();
	
	      img.addEventListener("load", function () {
	        _this3.photoScale = _this3.imageView.setMainImage(img);
	        _this3.hasImage = true;
	        _this3.enableSave();
	        _this3.$scope.$apply();
	      });
	
	      img.src = this.$window.URL.createObjectURL(file);
	    }
	  }, {
	    key: "enableSave",
	    value: function enableSave() {
	      if (this.hasText && this.hasImage) {
	        this.canSave = "enabled";
	      } else {
	        this.canSave = "disabled";
	      }
	    }
	  }, {
	    key: "setTextFocus",
	    value: function setTextFocus() {
	      var elem = document.getElementById(this.textId);
	      elem.style.visibility = "visible";
	      elem.focus();
	    }
	  }, {
	    key: "onTextFocus",
	    value: function onTextFocus() {
	      this.imageView.onTextFocus();
	    }
	  }, {
	    key: "onTextChange",
	    value: function onTextChange() {
	      this.hasText = true;
	      this.enableSave();
	      this.imageView.onTextChange(this.tonyText);
	    }
	  }, {
	    key: "onTextBlur",
	    value: function onTextBlur() {
	      document.getElementById(this.textId).style.visibility = "hidden";
	    }
	  }, {
	    key: "onScaleChange",
	    value: function onScaleChange(amt) {
	      this.photoScale += amt;
	      this.imageView.onScaleChange(this.photoScale);
	    }
	  }, {
	    key: "onSaveImage",
	    value: function onSaveImage() {
	      var _this4 = this;
	
	      if (this.canSave === "enabled") {
	        this.canSave = "disabled";
	        var data = this.imageView.getCanvasData();
	        this.tonyDataService.uploadTony(data, function (msg, resp) {
	          console.log(msg, resp);
	          if (msg === "success") {
	            _this4.showSuccessOverlay();
	          } else {
	            _this4.showErrorOverlay();
	          }
	        });
	        //console.log(data);
	      }
	    }
	  }, {
	    key: "showErrorOverlay",
	    value: function showErrorOverlay() {
	      this.enableSave();
	      $("#tonymaker-overlay").modal("hide");
	      $("#tonymaker-error").modal("show").on("hide.bs.modal", function () {
	        $("#tonymaker-overlay").modal("show");
	      });
	    }
	  }, {
	    key: "showSuccessOverlay",
	    value: function showSuccessOverlay() {
	      this.enableSave();
	      $("#tonymaker-overlay").modal("hide");
	      $("#tonymaker-success").modal("show");
	    }
	  }]);
	
	  return TonyMaker;
	})();
	
	exports["default"] = TonyMaker;
	module.exports = exports["default"];

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var TonyMakerImageView = (function () {
	  function TonyMakerImageView($interval) {
	    _classCallCheck(this, TonyMakerImageView);
	
	    this.$interval = $interval;
	  }
	
	  _createClass(TonyMakerImageView, [{
	    key: "init",
	    value: function init() {
	      this.images = {};
	      this.fullPhotoBounds = { x: 240, y: 180, width: 414, height: 474, xRatio: 0, yRatio: 0 };
	      this.internalCanvas = document.createElement("canvas");
	      this.imageHolder = document.getElementById("loltony-holder");
	      this.children = {};
	
	      this.centerTextY = 0;
	      this.twoLineTextY = 0;
	      this.multiLineTextY = 0;
	
	      this.imageHolder.addEventListener("dragstart", function (evt) {
	        evt.preventDefault();
	      });
	
	      this.initLoad();
	    }
	  }, {
	    key: "initLoad",
	    value: function initLoad() {
	      var _this = this;
	
	      var preload = new createjs.LoadQueue();
	
	      preload.on("complete", function () {
	        _this.onFilesLoaded(preload);
	      }, this);
	
	      preload.loadManifest([{ id: "trust", src: "/images/loltony-trust-2x.png" }, { id: "write", src: "/images/loltony-write-2x.png" }, { id: "overlay", src: "/images/loltony-overlay-2x.png" }, { id: "placeholder", src: "/images/loltony-placeholder-2x.png" }, { id: "base", src: "/images/loltony-base-2x.png" }]);
	    }
	  }, {
	    key: "onFilesLoaded",
	    value: function onFilesLoaded(preload) {
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
	      var ic = this.internalCanvas;
	      ic.width = this.images.overlay.width;
	      ic.height = this.images.overlay.height;
	
	      var bounds = this.fullPhotoBounds;
	      bounds.xRatio = bounds.x / ic.width;
	      bounds.yRatio = bounds.y / ic.height;
	
	      this.stage = new createjs.Stage(ic);
	
	      this.addChildren();
	    }
	  }, {
	    key: "addChildren",
	    value: function addChildren() {
	      var stage = this.stage;
	      var c = this.children;
	
	      var placeholderImg = new createjs.Bitmap(this.images.placeholder);
	      stage.addChild(placeholderImg);
	      c.placeholderImg = placeholderImg;
	
	      var baseImg = new createjs.Bitmap(this.images.base);
	      stage.addChild(baseImg);
	      baseImg.compositeOperation = "multiply";
	      c.baseImg = baseImg;
	
	      var overlayImg = new createjs.Bitmap(this.images.overlay);
	      stage.addChild(overlayImg);
	      c.overlayImg = overlayImg;
	
	      var writeImg = new createjs.Bitmap(this.images.write);
	      stage.addChild(writeImg);
	      c.writeImg = writeImg;
	
	      var trustImg = new createjs.Bitmap(this.images.trust);
	      stage.addChild(trustImg);
	      trustImg.visible = false;
	      c.trustImg = trustImg;
	
	      this.addText();
	
	      this.update();
	      this.initComplete = true;
	    }
	  }, {
	    key: "update",
	    value: function update() {
	      this.stage.update();
	      this.imageHolder.src = this.internalCanvas.toDataURL("image/jpeg");
	      //console.log("update");
	    }
	  }, {
	    key: "reset",
	    value: function reset() {
	      if (this.initComplete) {
	
	        var c = this.children;
	        c.writeImg.visible = true;
	        c.placeholderImg.visible = true;
	        c.text.visible = false;
	        c.text.text = "";
	
	        if (c.mainImg && this.stage.contains(c.mainImg)) {
	          this.stage.removeChild(c.mainImg);
	          c.mainImg.image = null;
	          c.mainImg = null;
	          this.images.main = null;
	        }
	
	        this.update();
	      }
	    }
	  }, {
	    key: "addText",
	    value: function addText(stage) {
	      var text = new createjs.Text("...", "38px GloriaHallelujah", "#000000");
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
	      text.text = "";
	
	      this.stage.addChild(text);
	      this.children.text = text;
	    }
	  }, {
	    key: "onTextFocus",
	    value: function onTextFocus() {
	      this.children.text.visible = true;
	    }
	  }, {
	    key: "onTextChange",
	    value: function onTextChange(newText) {
	      var c = this.children;
	
	      c.text.text = newText;
	      c.text.visible = true;
	      var lines = c.text.getMetrics().lines.length;
	      if (lines > 2) {
	        c.text.y = this.multiLineTextY;
	      } else if (lines == 2) {
	        c.text.y = this.twoLineTextY;
	      } else {
	        c.text.y = this.centerTextY;
	      }
	
	      c.writeImg.visible = false;
	
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
	      placeholder.visible = false;
	
	      this.update();
	
	      this.setDragHandler();
	
	      return Math.ceil(scaler * 100);
	    }
	  }, {
	    key: "modifyMainImagePosition",
	    value: function modifyMainImagePosition(x, y) {
	      this.children.mainImg.x += x;
	      this.children.mainImg.y += y;
	      //this.update();
	    }
	  }, {
	    key: "setDragHandler",
	    value: function setDragHandler() {
	      var _this2 = this;
	
	      var f = function f(evt) {
	        evt.stopPropagation();
	        //evt.preventDefault();
	        if (evt.type === "touchstart") {
	          //evt.pageX = evt.originalEvent.changedTouches[0].pageX;
	          //evt.pageY = evt.originalEvent.changedTouches[0].pageY;
	          var tmp = {};
	
	          tmp.pageX = evt.changedTouches[0].pageX;
	          tmp.pageY = evt.changedTouches[0].pageY;
	          _this2.touchEventCoords = {
	            x: tmp.pageX,
	            y: tmp.pageY
	          };
	          _this2.onEventBegin(tmp, "touchmove", "touchend");
	        } else {
	          _this2.onEventBegin(evt, "mousemove", "mouseup");
	        }
	      };
	
	      //let $image = $(this.imageHolder);
	      //$image.on("touchstart", f);
	      //$image.on("mousedown", f);
	      this.imageHolder.addEventListener("touchstart", f, false);
	      this.imageHolder.addEventListener("mousedown", f, false);
	    }
	  }, {
	    key: "onEventBegin",
	    value: function onEventBegin(evt, moveType, endType) {
	      var _this3 = this;
	
	      if (this.isPointWithinBounds(evt)) {
	        (function () {
	          // lower fps on mobile
	          var framerate = moveType === "touchmove" ? 6 : 30;
	          _this3.updateInterval = _this3.$interval(function (args) {
	            _this3.update();
	          }, 1 / framerate);
	          //console.log(evt);
	          //let body = $("body");
	          var body = document.getElementsByTagName("body")[0];
	          var moveMouse = function moveMouse(event) {
	            _this3.modifyMainImagePosition(event.movementX, event.movementY);
	          };
	          var moveTouch = function moveTouch(event) {
	            event.stopPropagation();
	            event.preventDefault();
	            var old = _this3.touchEventCoords;
	            //let x = event.originalEvent.changedTouches[0].pageX;
	            //let y = event.originalEvent.changedTouches[0].pageY;
	            var x = event.changedTouches[0].pageX;
	            var y = event.changedTouches[0].pageY;
	            var tmp = {};
	            tmp.movementX = x - old.x;
	            tmp.movementY = y - old.y;
	            old.x = x;
	            old.y = y;
	            moveMouse(tmp);
	          };
	          var move = moveType === "touchmove" ? moveTouch : moveMouse;
	          var end = function end(event) {
	            event.stopPropagation();
	            event.preventDefault();
	            _this3.$interval.cancel(_this3.updateInterval);
	            //body.off(moveType, move);
	            //body.off(endType, end);
	            body.removeEventListener(moveType, move, false);
	            body.removeEventListener(endType, end, false);
	            _this3.touchEventCoords = null;
	          };
	          //body.on(moveType, move);
	          //body.on(endType, end);
	          body.addEventListener(moveType, move, false);
	          body.addEventListener(endType, end, false);
	        })();
	      }
	    }
	  }, {
	    key: "isPointWithinBounds",
	    value: function isPointWithinBounds(evt) {
	      var image = this.imageHolder;
	      var bounds = this.fullPhotoBounds;
	
	      var local = this.globalToLocal($(image), evt.pageX, evt.pageY);
	
	      var xRatio = local.x / image.width;
	      var yRatio = local.y / image.height;
	
	      return xRatio >= bounds.xRatio && yRatio >= bounds.yRatio;
	    }
	  }, {
	    key: "globalToLocal",
	    value: function globalToLocal(context, globalX, globalY) {
	      var position = context.offset();
	      return {
	        x: Math.floor(globalX - position.left),
	        y: Math.floor(globalY - position.top)
	      };
	    }
	  }, {
	    key: "getCanvasData",
	    value: function getCanvasData() {
	      this.children.trustImg.visible = true;
	      this.stage.update();
	      var data = this.internalCanvas.toDataURL("image/jpeg");
	
	      this.children.trustImg.visible = false;
	      this.stage.update();
	
	      return data;
	    }
	  }]);
	
	  return TonyMakerImageView;
	})();
	
	exports["default"] = TonyMakerImageView;
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
	  function TonyDataService($http, $q, $log, $document) {
	    _classCallCheck(this, TonyDataService);
	
	    this.$http = $http;
	    this.$q = $q;
	    this.$log = $log;
	    this.$document = $document;
	    this.init();
	    this.checkDeepLink();
	    this.loadData();
	  }
	
	  _createClass(TonyDataService, [{
	    key: "init",
	    value: function init() {
	      var data = {};
	
	      data.title = this.$document[0].title;
	
	      var urls = {};
	      var loc = location.hostname + "/";
	      urls.base = loc.indexOf("localhost") !== -1 || loc.indexOf("192.168.") !== -1 ? "http://52.30.249.142/" : "/";
	      urls.origin = location.origin + "/";
	      urls.memeBase = "tony/";
	      urls.imageList = urls.base + "meme_api/memes/";
	      urls.imageUpload = urls.base + "meme_api/memes/";
	      data.urls = urls;
	
	      var dummyList = [];
	      for (var i = 0; i < 42; ++i) {
	        //match format of backend data
	        dummyList.push({ image: "/images/meme-2x.jpg", id: "" + i });
	      }
	      data.dummyList = dummyList;
	
	      var thumbList = [];
	      data.thumbList = thumbList;
	
	      data.currentTony = {
	        link: "",
	        id: "",
	        deeplink: ""
	      };
	
	      this.data = data;
	    }
	  }, {
	    key: "checkDeepLink",
	    value: function checkDeepLink() {
	      var state = History.getState();
	      if (state.hash.indexOf(this.data.urls.memeBase) === -1) {
	        // no deeplink
	        // don't load something, let it be set by the data list return;
	        //this.loadSingleTony(5);
	      } else {
	          // deeplink
	          var id = parseInt(state.url.split(this.data.urls.memeBase)[1]);
	          this.loadSingleTony(id);
	        }
	    }
	  }, {
	    key: "loadSingleTony",
	    value: function loadSingleTony(id) {
	      var _this = this;
	
	      var data = this.data;
	      if (data.thumbList[id]) {
	        this.setCurrentTony(id);
	      } else {
	        this.$http.get("" + data.urls.imageList + id).then(function (result) {
	          _this.formatImageData(result.data);
	          _this.setCurrentTonyByData(result.data);
	        }, function (message, code) {
	          data.currentTony.link = "images/meme-2x.jpg";
	          data.currentTony.id = "tony-1138";
	          data.currentTony.deeplink = data.urls.memeBase + "0";
	        });
	      }
	    }
	  }, {
	    key: "loadData",
	    value: function loadData() {
	      var _this2 = this;
	
	      this.$http.get(this.data.urls.imageList).then(function (data) {
	        _this2.setThumbList(data.data);
	      }, function (message, code) {
	        _this2.setThumbList(_this2.data.dummyList);
	        _this2.$log.warn("$http error - getThumbList: Using dummy list -", message, code);
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
	      var memeBase = this.data.urls.memeBase;
	      var baseUrl = "" + this.data.urls.origin + memeBase;
	      var format = this.formatImageData;
	
	      thumbList.splice(0, thumbList.length);
	      var len = arr.length;
	      for (var i = 0; i < len; ++i) {
	        var elem = arr[i];
	        format(elem, baseUrl, memeBase);
	        thumbList.push(elem);
	      }
	      var state = History.getState();
	      if (state.hash.indexOf(memeBase) === -1) {
	        this.setCurrentTonyByData(thumbList[thumbList.length - 1]);
	      }
	    }
	  }, {
	    key: "formatImageData",
	    value: function formatImageData(obj, url, base) {
	      obj.url = obj.image;
	      obj.deeplink = "" + url + obj.id;
	      obj.pushState = "" + base + obj.id;
	    }
	  }, {
	    key: "getCurrentTony",
	    value: function getCurrentTony() {
	      return this.data.currentTony;
	    }
	  }, {
	    key: "getTonyById",
	    value: function getTonyById(id) {
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;
	
	      try {
	        for (var _iterator = this.data.thumbList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var tony = _step.value;
	
	          if (tony.id === id) {
	            return tony;
	          }
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator["return"]) {
	            _iterator["return"]();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }
	
	      return undefined;
	    }
	  }, {
	    key: "setCurrentTony",
	    value: function setCurrentTony(id) {
	      var tony = this.data.currentTony;
	      var thumb = this.getTonyById(id);
	      this.setCurrentTonyByData(thumb);
	      var state = History.getState().hash.indexOf(this.data.urls.memeBase) === -1 ? tony.pushState : tony.id;
	
	      History.pushState({ id: "tony-" + tony.id }, this.data.title + ": " + tony.id, state.toString());
	    }
	  }, {
	    key: "setCurrentTonyByData",
	    value: function setCurrentTonyByData(tonyData) {
	      var tony = this.data.currentTony;
	      tony.link = tonyData.url;
	      tony.id = tonyData.id;
	      tony.deeplink = tonyData.deeplink;
	      tony.pushState = tonyData.pushState;
	    }
	  }, {
	    key: "uploadTony",
	    value: function uploadTony(data, onComplete) {
	      this.$http.post(this.data.urls.imageUpload, { "image": data }).then(function (data) {
	        onComplete("success", data);
	      }, function (message, code) {
	        onComplete("error", { "message": message, "code": code });
	      });
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

/***/ }
]);
//# sourceMappingURL=application.js.map