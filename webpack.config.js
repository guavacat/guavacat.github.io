const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const { StatsWriterPlugin } = require("webpack-stats-plugin")

const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/js/app.js',
  mode: process.env.NODE_ENV,
  output: {
    path: `${__dirname}/public`,
    publicPath: '/',
    filename: devMode ? 'bundle.js' : '[name].[hash].js',
  },
  resolve: {
    alias: {
        'react': 'preact/compat',
        'react-dom': 'preact/compat'
    }
  },
  optimization: devMode ? {} : {
    minimizer: [new TerserPlugin()],
    minimize: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ['svg-inline-loader']
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      DEV_MODE: devMode,
    }),
    new HtmlWebpackPlugin({
      title: 'bryce.io',
      description: 'I write code.',
      image: 'https://www.bryce.io/assets/favicon.png',
      url: 'https://bryce.io',
      template: 'src/index.html',
      favicon: 'src/img/favicon.png'
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ProgressBarPlugin(),
    new StatsWriterPlugin({
      filename: "stats.json",
      stats: {
        all: true,
        assets: true
      }
    })
  ],
  devServer: {
    contentBase: './public',
    hot: true,
    open: true
  },
};