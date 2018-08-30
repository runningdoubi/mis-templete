const path = require('path');
// const webpack = require('webpack');
const utils = require('./utils.js');
const config = require('./config.js');
function resolve (dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    context: path.resolve('./src'),
    entry: {
        app: './main.js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src'),
            'assets': resolve('/src/assets'),
            'components': resolve('/src/components')
        }
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: utils.vueLoaderOptions()
                }
            },
            {
                test: /\.(png|jpg|jpeg|svg|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: process.env.NODE_ENV === 'production'
                        ? `${config.prod.outputSubDirectory}img/[name].[hash:7].[ext]`
                        : 'img/[name].[ext]'
                    }
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 10,
                        name: process.env.NODE_ENV === 'production'
                        ? `${config.prod.outputSubDirectory}fonts/[name].[hash:7].[ext]`
                        : 'fonts/[name].[ext]'

                    }
                }
            }
        ]
    }
};