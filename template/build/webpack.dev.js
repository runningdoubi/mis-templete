const merge = require('webpack-merge');
const webpack = require('webpack');
const WebpackHttpDeploy = require('../plugins/upload.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
const utils = require('./utils.js');
const config = require('./config.js');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
Object.keys(common.entry).forEach(function (name) {
    common.entry[name] = ['../build/client.js'].concat(common.entry[name]);
});
module.exports = merge(common, {
    devtool: 'inline-source-map',
    output: {
        // 使用chunkhash可以避免改变一个chunk的时候引起其他chunk的改变
        // 跟hash的区别，详见:https://zhuanlan.zhihu.com/p/23595975
        // filename: 'js/[name].[chunkhash:7].js',
        // 这里在开发环境下所有的产出都不加hash(包括chunkhash和hash)，避免每次release时
        // 由于指纹的变化都会在开发机上产生多余的文件
        filename: 'js/[name].js',
        path: path.posix.join(__dirname, 'output'),
        publicPath: config.dev.outputPublicPath + config.dev.outputSubDirectory,
        chunkFilename: 'js/[name].async.js'
        // chunkFilename: 'js/[name].[chunkhash:7].async.js'
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        }),
        // 抽取node_modules下公共的模块
        // 避免频繁release一些库文件
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: (module, count) => {
                return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            }
        }),
        // 抽取webpack runtime和manifest文件
        // 原因同上
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            // 开发环境里不能使用chunkhash,webpack会报错
            // filename: 'manifest.[hash:7].js',
            chunks: ['vendor']
        }),
        new webpack.HotModuleReplacementPlugin(),
        new WebpackHttpDeploy()
    ]
});