const path = require('path');
module.exports = {
    dev: {
        outputPath: path.resolve(__dirname, './static'),// 对应output中的path
        outputPublicPath: '{{site}}'.match(/(\w+:\/\/)?(.*?\/)/)[0],// 对应output中的publicPath,
        outputSubDirectory: 'resource/{{name}}/',// 资源的二级目录
        port: 3000
    },
    prod: {
        outputPath: path.resolve(__dirname, '../output/'),
        outputPublicPath: 'https://gss0.bdstatic.com/5eR1dDebRNRTm2_p8IuM_a/',
        outputSubDirectory: 'resource/{{name}}/'
    }
}