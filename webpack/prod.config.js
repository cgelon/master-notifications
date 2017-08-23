const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = merge(baseConfig, {
  output: {
    filename: "dist/master-notifications.js",
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins: [
    new extractTextPlugin("./dist/master-notifications.css")
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loader: extractTextPlugin.extract(["css-loader", "sass-loader"]) }
    ]
  }
});