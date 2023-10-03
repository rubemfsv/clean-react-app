const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
        },
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader?limit=100000',
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  devServer: {
    static: {
      directory: './public',
    },
    devMiddleware: {
      writeToDisk: true,
    },
    historyApiFallback: true,
    port: 8081,
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('your_local_env_url'),
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html',
    }),
  ],
})
