import path from 'path';
import fs from 'fs';
import HappyPack from 'happypack';
import { DllReferencePlugin, HotModuleReplacementPlugin } from 'webpack';

import { Common, DevServer, Output } from './variables';

const threadPool = HappyPack.ThreadPool({ size: 3 });

function makeHappyPlugin(id, loaders = false) {
  const tempDir = path.resolve('.happypack', 'caches', Common.cacheToken);

  if(!fs.existsSync(path.resolve('.happypack'))) {
    fs.mkdirSync(path.resolve('.happypack'));
  }

  if(!fs.existsSync(path.resolve('.happypack', 'caches'))) {
    fs.mkdirSync(path.resolve('.happypack', 'caches'));
  }

  if(!fs.existsSync(path.resolve(tempDir))) {
    fs.mkdirSync(path.resolve(tempDir));
  }

  const opts = {
    id,
    threadPool,
    cache: true,
    tempDir,
    verbose: false
  };

  if(loaders) {
    opts.loaders = loaders;
  }

  return new HappyPack(opts);
}

export default {
  devtool: 'source-map',
  devServer: DevServer,
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      path.resolve('src/js/index.js')
    ]
  },
  module: {
    loaders: [
      {
        test: Common.loaders.babel.test,
        exclude: Common.loaders.babel.exclude,
        loader: 'happypack/loader?id=babel'
      },
      {
        test: Common.loaders.url.test,
        exclude: Common.loaders.url.exclude,
        loader: 'happypack/loader?id=url'
      },
      {
        test: Common.loaders.json.test,
        exclude: Common.loaders.json.exclude,
        loader: 'happypack/loader?id=json'
      }
    ]
  },
  output: {
    publicPath: Output.publicPath,
    path: Output.path,
    filename: 'js/[name].js'
  },
  plugins: [
    makeHappyPlugin('babel', [Common.loaders.babel.loader]),
    makeHappyPlugin('json', [Common.loaders.json.loader]),
    makeHappyPlugin('url', [Common.loaders.url.loader]),
    new DllReferencePlugin({
      context: '.',
      manifest: require(`${Output.path}/js/vendor-manifest.json`) // eslint-disable-line
    }),
    new HotModuleReplacementPlugin()
  ],
  resolve: Common.resolve
};