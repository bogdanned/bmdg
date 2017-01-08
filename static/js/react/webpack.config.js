const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  index: path.join(__dirname, 'app/index.js'),
  build: path.join(__dirname, 'build'),
  capsule: path.join(__dirname, 'app/capsules.js'),
  sidebar: path.join(__dirname, 'app/sidebar.js'),
};

var webpack = require('webpack');



module.exports = [
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      index: PATHS.index,
    },
    output: {
      path: PATHS.build,
      filename: 'index.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react',],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'BMDG'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      /*
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
          warnings: true,
        }
      }),*/
    ]
  },
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      index: PATHS.sidebar,
    },
    output: {
      path: PATHS.build,
      filename: 'sidebar.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react',],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'BMDG'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      /*
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
          warnings: true,
        }
      }),*/
    ]
  },
  {
    // Entry accepts a path or an object of entries.
    // We'll be using the latter form given it's
    // convenient with more complex configurations.
    entry: {
      index: PATHS.capsule,
    },
    output: {
      path: PATHS.build,
      filename: 'capsules.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            presets: ['react',],
            plugins: ['react-html-attrs', 'transform-class-properties', 'transform-decorators-legacy'],
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'BMDG'
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      /*
      new webpack.DefinePlugin({
        'process.env':{
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        mangle: false,
        sourcemap: false,
        compress: {
          warnings: true,
        }
      }),*/
    ]
  },
]
