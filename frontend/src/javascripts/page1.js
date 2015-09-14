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

import Application from "./application.js";

const documentReady = function(callback){
  if (document.readyState != "loading"){
    callback();
  } else {
    var listenerFn = function(){
      document.removeEventListener("DOMContentLoaded", listenerFn);
      callback();
    };
    document.addEventListener("DOMContentLoaded", listenerFn);
  }
};

const onDocReady = function(){
  var app = new Application();
};

documentReady(onDocReady);

