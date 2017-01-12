var webpack = require("webpack");

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
    new webpack.optimize.UglifyJsPlugin()
  ],
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
}