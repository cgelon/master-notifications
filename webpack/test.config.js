const webpack = require("webpack");

module.exports = {
  target: "node",
  externals: ["jquery", "moment"],
  resolve: {
    extensions: [".ts", ".js"]
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: "ts-loader" },
      { test: /\.scss$/, loaders: ['css-loader/locals?modules', 'sass-loader'] }    
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: "jQuery",
        jQuery: "jQuery"
    })
  ]
}