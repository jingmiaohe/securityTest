'use strict'
const webpack = require('webpack')
module.exports = {
  mode: 'development',
  devtool:'cheap-module-source-map', //debug时可以查找到相应js 而不是打包后的js
  devServer: {
    host: 'localhost',
    port: '8088',
    proxy: { // proxy URLs to backend development server
      '/': {
        // target: 'http://139.199.37.218:8080', // 设置你调用的接口域名和端口号
				target: 'http://bjkas.zayxy.com', // 设置你调用的接口域名和端口号
        changeOrigin: true,     // 跨域
        pathRewrite: {
          '^/': '/'
        }
      }
    },
    historyApiFallback: true, //允许热更新时 解决history路径的刷新失败
    noInfo: true,
    overlay: true
  },
  plugins:[
    new webpack.HotModuleReplacementPlugin()
  ]
}
