// post css配置
module.exports = {
    plugins: [
        require('cssnano')({
            autoprefixer: {
                add: true
            }
        })
    ]
}