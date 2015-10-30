var config = require("./");

module.exports = {
  src: config.sourceAssets + "/images/**",
  dest: config.publicAssets + "/images",
  faviconSrc: config.sourceAssets + "/images/icons/favicon.ico",
  faviconDest: config.publicAssets
};
