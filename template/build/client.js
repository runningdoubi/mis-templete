/* eslint-disable */
require('eventsource-polyfill');
var hotClient = require('webpack-hot-middleware/client?noInfo=true&reload=true&path=http://127.0.0.1:3000/__webpack_hmr');
hotClient.subscribe(function (event) {
  // if (event.action === 'reload') {
  //   window.location.reload();
  // }
})