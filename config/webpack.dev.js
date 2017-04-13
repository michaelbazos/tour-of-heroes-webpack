const path = require('path');
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
  devtool: 'cheap-module-eval-source-map',

  /**
   * @see http://webpack.github.io/docs/configuration.html#entry
   */
  entry: {
    main: './src/main.ts',
    polyfills: './src/polyfills.ts'
  },

  /**
   * @see http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  },

  /**
   * @see http://webpack.github.io/docs/configuration.html#output
   */
  output: {
    path: path.resolve('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre',
        exclude: [path.resolve('node_modules/rxjs')] 
      },
      {
        test: /\.ts$/,
        use: ['angular2-template-loader', 'ts-loader']
      },
      {
        test: /\.css$/,
        use: ['raw-loader']
      },
      {
        test: /\.scss/,
        use: ['raw-loader', 'sass-loader?outputStyle=expanded']
      },
      {
        test: /\.html$/,
        use: ['raw-loader'],
        exclude: [path.resolve('src/index.html')]
      }
    ]
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({debug: true}),

    new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'polyfills'] }),

    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.resolve('src')
    ),

    new HtmlWebpackPlugin({
      template: 'src/index.html',
      chunksSortMode: 'dependency'
    }),
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
    contentBase: path.resolve('src'),
    port: ENV.port,
    host: ENV.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 200,
      poll: 2000
    }
  }
};
