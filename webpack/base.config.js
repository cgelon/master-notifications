module.exports = {
  externals: ["jquery", "moment"],
  entry: "./src/ts/NotificationController.ts",
  output: {
    libraryTarget: "var",
    library: "MasterNotifications"
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" }
    ]
  }
}