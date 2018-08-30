// 设置一下环境变量
process.env.NODE_ENV = 'production';
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
// 清除产出的插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');
// 抽取css
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// 压缩代码
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const utils = require('./utils.js');
const config = require('./config.js');
module.exports = merge(common, {
    output: {
        path: config.prod.outputPath,
        filename: config.prod.outputSubDirectory + 'js/[name].[chunkhash:7].js',
        publicPath: config.prod.outputPublicPath,
        chunkFilename: config.prod.outputSubDirectory + 'js/[name].async.[chunkhash:7].js'
    },
    module: {
        rules: utils.styleLoaders()
    },
    plugins: [
        new CleanWebpackPlugin('output', {
            root: path.join(__dirname, '..'),
            allowExtra: true
        }),// 清除旧的产出
        new webpack.optimize.CommonsChunkPlugin({// 抽取node_modules下公共的模块
            name: 'vendor',
            minChunks: (module, count) => {
                return module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0
            }
        }),
        // 从上面抽取的vendor公共模块中再抽取公共模块
        // 这里抽取出来webpack 的 runtime代码
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            chunks: ['vendor']
        }),
        // 定义process.env，用来替换比如vue源码中的process.env==='production'的部分
        // 减少代码的体积
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new UglifyJsPlugin(),// 压缩代码，同时还会进行tree-shaking
        // 抽取css代码到单独文件
        new ExtractTextPlugin({
            // 该插件默认只会抽取初始入口的chunk的内容
            // 因为存在common chunk ,所以这里指定allChunks为true
            // TODO:这里会把项目中的所有css提取到一个文件中，如何可以定制css文件呢？
            allChunks: true,
            filename: config.prod.outputSubDirectory + 'css/style.[contenthash:7].css'
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        new HtmlWebpackPlugin({
            title: 'Code Splitting',
            template: './index.html',
            filename: path.posix.join(config.prod.outputPath, 'template/page/{{name}}/index.html'),
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            // 由于会打包出多个chunk，需要按照依赖注入到html中
            chunksSortMode: 'dependency'
        })
    ]
});