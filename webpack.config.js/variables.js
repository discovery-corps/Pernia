import path from 'path';
import md5File from 'md5-file';

const cacheToken = `node:${process.env.NODE_ENV}_` +
  `babel:${process.env.BABEL_ENV || process.env.NODE_ENV}_` +
  `babelrc:${md5File.sync('.babelrc')}`;

const Common = {
  // probably don't need to change any of this
  cacheToken,
  path: path.resolve('public'),
  publicPath: '/public/',
  stats: { // webpack output configuration
    colors: true,
    reasons: true,
    hash: false,
    modulesSort: 'name'
  },

  // resolution - where webpack is looking for source files
  resolve: {
    extensions: ['.js'],
    modules: [
      path.resolve('src/js'),
      path.resolve('node_modules')
    ]
  },

  // loaders - how webpack interacts with files once it finds them
  loaders: {
    babel: {
      test: /\.jsx?$/,
      exclude: /((node_modules|bower_components)|(__tests__))/,
      loader: `babel-loader?cacheDirectory=.babelcache/${cacheToken}`
    },
    json: {
      test: /\.json$/,
      loader: 'json-loader'
    },
    url: {
      test: /\.(ttf|svg|otf|eot|woff2?|png|gif|jpe?g)$/,
      loader: 'url-loader?limit=500&name=js/[hash].[ext]'
    }
  }
};

const DevServer = {
  compress: true,
  historyApiFallback: true,
  host: 'localhost',
  hot: true,
  https: true,
  port: 8080,
  contentBase: '.',
  publicPath: '/public/',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  }
};

const OptimizationPlugins = [];

const Output = {
  publicPath: '/public/',
  path: path.resolve('public/')
};

// 3rd party libraries we precompile into dll.js
const VendorLibs = [
  'react',
  'react-dom'
];

export {
  Common,
  DevServer,
  OptimizationPlugins,
  Output,
  VendorLibs
};