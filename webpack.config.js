var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var path = require('path');

var isDevelopment = process.env.NODE_ENV !== 'production';
var BUILD_PATH = path.resolve(__dirname, 'build');

var common = {
  entry: {
    app: ['./app/app.js'],
    vendor: Object.keys(require('./package.json').dependencies)
  },
  output: {
    path: BUILD_PATH,
    publicPath: '/',
    filename: '[name].bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
      { test: /\.json$/, loaders: [ 'json' ], exclude: /node_modules/ },
      { test: /\.css$/, loader: 'style-loader!css-loader!postcss-loader' }
    ]
  },
  postcss: function () {
    return [require('autoprefixer'), require('precss')];
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Apache Lens',
      template: './index.html'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      chunks: ['app']
    }),
    new webpack.NoErrorsPlugin()
  ]
};

var finalConf;

if (isDevelopment) {
  finalConf = Object.assign({}, common);
  finalConf.entry.app = ['webpack-hot-middleware/client',
    ...finalConf.entry.app]; // HMR
  finalConf.entry.vendor = [...finalConf.entry.vendor, 'redux-logger'];
  finalConf.devtool = 'source-map';
  finalConf.plugins = [...finalConf.plugins,
    new webpack.HotModuleReplacementPlugin()];
} else {
  // production config
  finalConf = Object.assign({}, common);
  finalConf.output.filename = '[name].bundle.[chunkhash].js';
  finalConf.output.publicPath = '/';
  finalConf.output.chunkFilename = '[name].bundle.[chunkhash].js';
  finalConf.devtool = false;
  finalConf.plugins = [...finalConf.plugins,
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new CleanWebpackPlugin(['build']),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    })
  ];
}

module.exports = finalConf;
