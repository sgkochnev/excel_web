const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const ESLintWebpackPlugin = require('eslint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanPlugin } = require('webpack')

const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const filename = ext => (isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`)

function cssLoaders() {
  postcssLoader = {
    loader: 'postcss-loader',
    options: {
      postcssOptions: {
        plugins: {
          'postcss-import': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  }

  const loaders = [
    MiniCssExtractPlugin.loader,
    'css-loader',
    postcssLoader,
  ]

  if (isProd) {
    postcssLoader.options.postcssOptions.plugins.cssnano = { present: 'default' }
  }

  return loaders
}


module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    index: './index.js',
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.js', '.ts'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core'),
    },
  },

  devtool: isDev ? 'source-map' : false,
  devServer: {
    watchFiles: ['./src/*'],
    port: 8080,
    hot: isDev,
  },

  plugins: [
    new ESLintWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      minify: {
        removeComments: isProd,
        collapseWhitespace: isProd,
      },
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, './src/favicon.ico'),
          to: path.resolve(__dirname, './dist/faicon.ico'),
        },
      ],
      options: {

      },
    }),
    new CleanPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),

    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
  ],

  module: {
    rules: [{
      test: /\.css$/i,
      use: cssLoaders(),
    }],
  },
}
