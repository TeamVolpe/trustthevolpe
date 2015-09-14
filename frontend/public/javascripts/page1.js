webpackJsonp([0,2],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*
	import './asyncModules'
	import exclaimify from './exclaimify';
	
	const button = document.getElementById('button');
	
	const alertAsyncMessage = function() {
	  // CommonJS async syntax webpack magic
	  require.ensure([], function() {
	    const message = require("./asyncMessage");
	    alert(exclaimify(message));
	  });
	};
	
	console.log(`
	  asset references like this one:
	    images/gulp.png
	  get updated in js too!`);
	
	button.addEventListener('click', alertAsyncMessage);
	
	const overlayCloseBtn = document.getElementById('overlay-close');
	const closeOverlay = function(){
	  require.ensure([], function(){
	    const overlay = document.getElementById('overlay');
	    overlay.css("display", "none");
	  });
	};
	overlayCloseBtn.addEventListener('click', closeOverlay);
	*/
	
	"use strict";
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
	
	var _applicationJs = __webpack_require__(2);
	
	var _applicationJs2 = _interopRequireDefault(_applicationJs);
	
	var documentReady = function documentReady(callback) {
	  if (document.readyState != "loading") {
	    callback();
	  } else {
	    var listenerFn = function listenerFn() {
	      document.removeEventListener("DOMContentLoaded", listenerFn);
	      callback();
	    };
	    document.addEventListener("DOMContentLoaded", listenerFn);
	  }
	};
	
	var onDocReady = function onDocReady() {
	  var app = new _applicationJs2["default"]();
	};
	
	documentReady(onDocReady);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var LolTony = __webpack_require__(3);
	
	var Application = (function () {
	  function Application() {
	    _classCallCheck(this, Application);
	
	    this.lolTonyOverlay = new LolTony(document.getElementById("tonymaker-overlay"));
	    this.init();
	  }
	
	  _createClass(Application, [{
	    key: "init",
	    value: function init() {
	      var closeButtons = document.getElementsByClassName("overlay-close");
	      for (var i = 0; i < closeButtons.length; ++i) {
	        var btn = closeButtons[i];
	        btn.addEventListener("click", this.closeOpenOverlay);
	      }
	
	      var makeBtn = document.getElementsByClassName("make-a-tony")[0];
	      makeBtn.addEventListener("click", this.showNewOverlay);
	    }
	  }, {
	    key: "closeOpenOverlay",
	    value: function closeOpenOverlay() {
	      var overlays = document.getElementsByClassName("overlay");
	      for (var i = 0; i < overlays.length; ++i) {
	        if (overlays[i].className != "overlay overlay-invisible") {
	          overlays[i].className = "overlay overlay-invisible";
	        }
	      }
	    }
	  }, {
	    key: "showNewOverlay",
	    value: function showNewOverlay() {
	      var overlay = document.getElementById("tonymaker-overlay");
	      overlay.className = "overlay overlay-visible";
	    }
	  }]);
	
	  return Application;
	})();
	
	exports["default"] = Application;
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
	      preload.loadManifest([{ id: "write", src: "images/loltony-write-2x.png" }, { id: "overlay", src: "images/loltony-overlay-2x.png" }, { id: "placeholder", src: "images/loltony-placeholder-2x.png" }, { id: "base", src: "images/loltony-base-2x.png" }]);
	    }
	  }, {
	    key: "onFilesLoaded",
	    value: function onFilesLoaded() {
	      var preload = this.preload;
	      this.images = {};
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
	
	      stage.addChild(baseImg);
	      stage.addChild(placeholderImg);
	      stage.addChild(overlayImg);
	      stage.addChild(writeImg);
	
	      stage.update();
	
	      var placeholder = document.getElementById("loltony-holder");
	      placeholder.src = ic.toDataURL("image/png");
	    }
	  }]);
	
	  return LolTony;
	})();
	
	exports["default"] = LolTony;
	module.exports = exports["default"];

/***/ }
]);
//# sourceMappingURL=page1.js.map