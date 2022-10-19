'use strict'
require('dotenv').config();
const baseJsDir             = './src';
const webpack               = require('webpack');
const path                  = require('path');
const distBaseDir           = path.resolve(__dirname, 'dist');
const nodeModsPath          = path.resolve(__dirname, 'node_modules');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = (env, argv) => {
  let baseConfig = {
    externals: [{ 'express': { commonjs: 'express' } }],
    target: "node",
    devtool: process.env.NODE_ENV === 'production' ? 'source-map' : 'inline-source-map',
    mode: process.env.NODE_ENV,
    entry: {
      app: `${baseJsDir}/http/server.js`
    },
    output: {
      clean: true,
      filename: 'js/[name].bundle.js',
      path: `${distBaseDir}`
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.LOG_LEVEL': JSON.stringify(process.env.LOG_LEVEL)
      })],
    module: {
      rules: [
        {
            exclude: nodeModsPath,
            loader: 'babel-loader',
            test: /\.js$/,
            options: {
                presets: ['@babel/preset-env'],
                targets: 'defaults'
            }
        }
      ]
    }
  };

  return baseConfig;
}
