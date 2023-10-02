'use strict';

let path = require('path');

module.exports = {
  mode: 'production',
  entry: './js/script.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist/js'
  },
  watch: true,

  devtool: "source-map",

  module: {
    rules: [
      {
        test: /\.m?js$/, // находи js файлы
        exclude: /(node_modules|bower_components)/, // исключая node modules
        use: {
          loader: 'babel-loader', // связ webpack с babel  npm i --save-dev babel-loader
          options: {
            presets: [['@babel/preset-env', { // пресет дефолтный
                debug: true,
                corejs: 3, //  npm i --save-dev core-js
                useBuiltIns: "usage"  // выбирает поллифиллы котрые нужны
            }]]
          }
        }
      }
    ]
  }
};
