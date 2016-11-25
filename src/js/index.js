import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HelloWorld from './helloworld';

function mount() {
  render(<AppContainer><HelloWorld /></AppContainer>, document.getElementById('application')); // eslint-disable-line
}

if(module.hot) {
  module.hot.accept('./helloworld', (...args) => {
    const NextApp = require('./helloworld').default;
    render(<AppContainer><NextApp /></AppContainer>, document.getElementById('application')); // eslint-disable-line

    console.log(args);
    mount();
  });
}

mount();