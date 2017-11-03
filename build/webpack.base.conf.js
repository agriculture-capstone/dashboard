'use strict'

const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

module.exports = {
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': utils.resolve('src'),
      '@root': utils.resolve('.')
    }
  },
  module: {
    rules: [
      // Source map loader to map typescript source-maps
      {
        enforce: 'pre',
        test: /\.js%/,
        loader: 'source-map-loader'
      },
      // ts-loader to compile typescript using tsc
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules|vue\/src/,
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      // Sass loader to enable using standalone scss files (if you really want to)
      {
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
      },
      // Vue loader to handle single file components
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig('base')
      },
      // Babel loader to compile typescript/vue output down to es5 (for browser support)
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: [utils.resolve('node_modules')]
      },
      // Url loaders to handle files
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
}
