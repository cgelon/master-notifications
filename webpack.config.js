var webpack = require("webpack");
var extractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  externals: ["jquery", "moment"],
  entry: "./src/ts/NotificationController.ts",
  output: {
    filename: "dist/master-notifications.js",
    libraryTarget: "var",
    library: "MasterNotifications"
  },
  devtool: "source-map",
  resolve: {
    extensions: ["", ".ts"]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new extractTextPlugin("./dist/master-notifications.css")
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.scss$/, loader: extractTextPlugin.extract(["css-loader", "sass-loader"]) }
    ]
  }
}