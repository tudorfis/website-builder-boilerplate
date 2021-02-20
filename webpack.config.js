// webpack config
const path = require('path');
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const { VueLoaderPlugin } = require('vue-loader');

module.exports = (env = {}) => ({
  context: path.resolve(__dirname, 'website-builder-app'),
  mode: env.production ? 'production' : 'development',
  entry: {
    app: './website-builder-app.js'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[hash:6].bundle.js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { hmr: !env.production }
          },
          'css-loader'
        ]
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: '../index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new WebpackBar(),
    new VueLoaderPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, '/'),
    publicPath: process.env.BASE_URL,
    index: './index.html',
    hot: true,
    stats: 'minimal',
    quiet: true,
    overlay: {
      warnings: true,
      errors: true
    },
    historyApiFallback: true,
  }
});