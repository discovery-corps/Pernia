import path from 'path';
import { DllPlugin } from 'webpack';
import { Common, OptimizationPlugins, Output, VendorLibs } from './variables';

const plugins = process.env.NODE_ENV === 'production' ? OptimizationPlugins : [];
plugins.push(new DllPlugin({
  path: path.join(Output.path, 'js/[name]-manifest.json'),
  name: '[name]',
  context: '.'
}));

export default {
  cache: process.env.NODE_ENV !== 'production' ? {} : false,
  devtool: 'source-map',
  output: {
    library: '[name]',
    publicPath: Output.publicPath,
    path: Output.path,
    filename: 'js/[name].js'
  },
  plugins,
  resolve: Common.resolve,
  stats: Common.stats,
  module: {
    loaders: [
      Common.loaders.babel,
      Common.loaders.json,
      Common.loaders.url
    ]
  },
  entry: {
    vendor: VendorLibs
  }
};