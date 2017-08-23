const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const webpack = require("webpack");

module.exports = merge(baseConfig, {
  devtool: "inline-source-map",
  output: {
    filename: "dev/master-notifications.js",
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
  ],
  module: {
    loaders: [
      { test: /\.scss$/, loader: ["style-loader", "css-loader?sourcemap", "sass-loader?sourcemap"] }
    ]
  }
});