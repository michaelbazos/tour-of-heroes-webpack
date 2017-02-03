const helpers = require('./helpers');

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = {
  name: 'development',
  host: 'localhost',
  port: 3000
};

/**
 * Webpack configuration
 * @see http://webpack.github.io/docs/configuration.html
 */
module.exports = {
  debug: true,
  devtool: 'cheap-module-eval-source-map',

  /**
   * @see http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    polyfills: './src/polyfills.ts',
    main: './src/main.ts'
  },

  /**
   * @see http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['', '.ts', '.js'],
    modulesDirectories: ['node_modules'],
    root: helpers.getPath('src')
  },

  /**
   * @see http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: helpers.getPath('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      { test: /\.js$/, loader: 'source-map', exclude: [ helpers.getPath('node_modules/rxjs') ] }
    ],
    loaders: [
      { test: /\.ts$/, loader: 'ts' },

      { test: /\.css$/,   loader: 'raw' },

      { test: /\.json$/,  loader: 'json' },

      { test: /\.scss/,   loader: 'raw!sass?outputStyle=expanded' },

      { test: /\.html$/,  loader: 'raw', exclude: [ helpers.getPath('src/index.html') ] }

    ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'polyfills'] }),

    new HtmlWebpackPlugin({ template: 'src/index.html', chunksSortMode: 'none' }),
    /**
     * @see: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(ENV.name),
      'process.env': {
        'ENV': JSON.stringify(ENV.name),
        'NODE_ENV': JSON.stringify(ENV.name)
      }
    })
  ],

  /**
   * @see: http://webpack.github.io/docs/webpack-dev-server.html
   */
  devServer: {
    contentBase: helpers.getPath('src'),
    port: ENV.port,
    host: ENV.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000
    }
  }
};
