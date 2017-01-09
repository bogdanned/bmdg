var path = require('path');
var webpack = require('webpack');


var PATHS = {
  main: path.join(__dirname, 'app/main.js'),
  build: path.join(__dirname, 'build'),
};


module.exports = {
  entry: PATHS.main,
  output: {
    path: PATHS.build,
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['transform-decorators-legacy',
                    'transform-class-properties'
                   ]

        }
      }
    ]
  },
};
