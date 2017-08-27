const nodeExternals = require("webpack-node-externals");
const webpack = require("webpack");

module.exports = {
  target: "node",
  externals: [nodeExternals()],
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