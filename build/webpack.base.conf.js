var path = require('path');
const productionConfig = require('./webpack.prod.conf.js');
const developmentConfig = require('./webpack.dev.conf.js');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const isProd = process.env.NODE_ENV === 'production'
const config = {
  context: path.resolve(__dirname, '../'),
  entry: ['babel-polyfill','./src/main.js'],
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name].[hash:4].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.less$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
        // use: ['style-loader', 'css-loader','postcss-loader', 'less-loader']
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg|xls|xlsx|mp4)$/,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@view': path.resolve(__dirname, '../src/view'),
      '@': path.resolve(__dirname, '../src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "./css/[name].css",
      chunkFilename: "./css/[id].css"
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      title: 'normal',
      minify: {
        collapseWhitespace: true,  //折叠空白区域 也就是压缩代码
        removeComments: true, //移除HTML中的注释
      }
    })
  ],
}

module.exports = () => {
  return process.env.NODE_ENV === 'production' ? merge(productionConfig, config) : merge(developmentConfig, config)
}
