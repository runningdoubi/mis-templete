var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isProd = process.env.NODE_ENV === 'production';
var cssLang = [{
    name: 'css',
    reg: /\.css$/,
    loader: 'css-loader'
}, {
    name: 'less',
    reg: /\.less$/,
    loader: 'less-loader'
},{
    name: 'stylus',
    reg: /\.stylus$/,
    loader: 'stylus-loader'
}];
function genLoaders(lang) {
    var loaders = ['css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ];
    if (lang.name !== 'css') {
        loaders.push(lang.loader);
    }
    // 如果是生产环境，用ExtractTextPlugin包装一下其他loader
    // 抽取css文件
    if (isProd) {
        loaders = ExtractTextPlugin.extract({
            use: loaders
        });
    }
    else {
        loaders.unshift('style-loader');
    }
    return loaders;
}
exports.styleLoaders = function () {
    var output = [];// 产生module里面的rules的值
    cssLang.forEach(lang => {
        output.push({
            test: lang.reg,
            use: genLoaders(lang)
        });
    });
    return output;
}
exports.vueLoaderOptions = function () {
    var options = {
        loaders: {}
    };
    cssLang.forEach(lang => {
        options.loaders[lang.name] = genLoaders(lang);
    });
    return options;
}