'use strict'

const path = require('path');
const glob = require('glob')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const setMPA = () => {
  const entry = {}
  const htmlWebpackPlugins = []
  const entryFiles = glob.sync(path.join(__dirname, './src/pages/*/index.js'))
  Object.keys(entryFiles)
    .map(index => {
      const entryFile = entryFiles[index]
      const match = entryFile.match(/src\/pages\/(.*)\/index\.js/)
      const pageName = match && match[1]
      entry[pageName] = entryFile
      htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          inlineSource: '.css$',
          template: path.join(__dirname, `src/pages/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: ['commons', pageName],
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false
          }
        })
      )
    })
  return {
    entry,
    htmlWebpackPlugins
  }
}
const { entry, htmlWebpackPlugins } = setMPA()
module.exports = {
  entry: entry,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_[chunkhash:8].js'
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'px2rem-loader',
            options: {
                remUnit: 75,
                remPrecision: 8
            }
          },
          'sass-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [
                require('autoprefixer')({
                  overrideBrowserslist: ['last 2 version', 'ios 7', '>1%']
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'img/[name]_[hash:8].[ext]'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name]_[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]_[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin({
      assetNameRegExp: /.css$/,
      cssProcessor: require('cssnano')
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: 'react',
          entry: 'https://unpkg.com/react@16/umd/react.production.min.js',
          global: 'React',
        },
        {
          module: 'react-dom',
          entry: 'https://unpkg.com/react-dom@16/umd/react-dom.production.min.js',
          global: 'ReactDOM',
        },
      ],
    })
  ].concat(htmlWebpackPlugins),
  optimization: {
    splitChunks: {
      minSize: 0,
      cacheGroups: {
        commons: {
          // test: /(react|react-dom)/,
          name: 'commons',
          chunks: 'all',
          minChunks: 1
        }
      }
    }
  },
  // devtool: 'source-map'
}