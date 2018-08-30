const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
// app.use(cors);
const hotMiddleware = require('webpack-hot-middleware')(compiler);
app.use(webpackDevMiddleware(compiler, {
    publicPath: 'http://127.0.0.1:3000/',
    headers: {
        'Access-Control-Allow-Origin': '*'// 被这个要坑死了快
    },
    lazy: false,
    index: 'index.html',
    mimeTypes: { "text/html": [ "html" ] }
}));
// 这个配合client的刷新会导致hmr失效
// issue: https://github.com/webpack/webpack/issues/5505
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' });
//     cb();
//   })
// })
app.use(hotMiddleware);
app.listen(3000, function () {
    console.log('Example app listening on port 3000!\n');
    // opn('http://www.hao123.com/webpack-demo');// 必须加上http
});