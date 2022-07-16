const { DefinePlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { NetlifyPlugin } = require('netlify-webpack-plugin');
const common = require('./webpack.common');
const { merge } = require('webpack-merge');

module.exports = merge(common, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
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
  externals: {
    react: 'React',
    axios: 'axios',
    'react-dom': 'ReactDOM',
    'react-router-dom': 'ReactRouterDOM',
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify(
        'http://fordevs.herokuapp.com/api'
      ),
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'main-bundle-[hash].css',
    }),

    new NetlifyPlugin({
      redirects: [
        {
          from: '/*',
          to: '/index.html',
          status: 200,
          force: false,
        },
      ],
    }),
  ],
});
