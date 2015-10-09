var path            = require('path');
var paths           = require('./');


module.exports = {
  'watch': path.resolve(paths.sourceAssets) + '/vendors/**/*.js',
  'jsSrc': path.resolve(paths.sourceAssets + '/vendors/'),
  'jsDest': path.resolve(paths.publicAssets + '/javascripts/'),
  'jsDestName': 'v.min.js',
  'orderedFiles': [
      'jquery.min.js',
      'angular.min.js',
      '*/*.js'
    ]
};
