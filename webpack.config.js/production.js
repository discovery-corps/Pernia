import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { DllReferencePlugin } from 'webpack';
import { Common, OptimizationPlugins, Output } from './variables';

const etp = new ExtractTextPlugin({
  filename: 'css/app.css',
  allChunks: true,
  disable: process.env.NODE_ENV !== 'production'
});

const plugins = OptimizationPlugins.concat([
  new DllReferencePlugin({
    context: '.',
    manifest: require(`${Output.path}/js/vendor-manifest.json`) // eslint-disable-line
  }),
  etp
]);

export default {
  cache: false,
  devtool: '',
  entry: {
    app: path.resolve('src/js/index.js')
  },
  module: {
    loaders: [
      Common.loaders.babel,
      Common.loaders.json,
      {
        test: Common.loaders.sass.test,
        loader: etp.extract({
          fallbackLoader: 'style',
          loader: Common.loaders.sass.loader
        })
      },
      Common.loaders.url
    ]
  },
  output: {
    publicPath: Output.publicPath,
    path: Output.path,
    filename: 'js/[name].js'
  },
  plugins,
  resolve: Common.resolve,
  stats: Common.stats
};