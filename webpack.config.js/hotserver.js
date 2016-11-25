import path from 'path';
import webpack from 'webpack';
import express from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import fs from 'fs';
import https from 'https';
import { DevServer } from './variables';
import config from './index';

const key = fs.readFileSync(path.join(__dirname, 'server.key'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, 'server.crt'), 'utf8');
const creds = {key, cert};

const app = express();
const compiler = webpack(config);

app.use(devMiddleware(compiler, {
  publicPath: config.output.publicPath,
  historyApiFallback: true
}));

app.use(hotMiddleware(compiler));

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

const server = https.createServer(creds, app);

server.listen(DevServer.port, (err) => {
  if(err) {
    console.error(err);
  } else {
    console.log(`Listening at http://localhost:${DevServer.port}/`);
  }
});