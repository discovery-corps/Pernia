import path from 'path';
import { DllReferencePlugin } from 'webpack';
import { Common, OptimizationPlugins, Output } from './variables';

const plugins = OptimizationPlugins.concat([
  new DllReferencePlugin({
    context: '.',
    manifest: require(`${Output.path}/js/vendor-manifest.json`) // eslint-disable-line
  })
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