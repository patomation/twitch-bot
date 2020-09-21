const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './build/overlay/overlay.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    inline: true,
    port: 4000
  }
}
