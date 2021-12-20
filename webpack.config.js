const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')

const templateContent = `
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Space Ramen Bot</title>
    </head>
    <body>
    </body>
    <style>
      * {
        padding: 0;
        margin: 0;
      }
      html {
        height: 100%;
      }
      body {
        height: 100%;
      }
    </style>
  </html>
`

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: './build/ui/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({ templateContent }),
    new Dotenv()
  ],
  devServer: {
    // contentBase: path.join(__dirname, 'dist'),
    // inline: true,
    port: 4000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|mp3|map|json)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  }
}
