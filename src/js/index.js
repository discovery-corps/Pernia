import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import HelloWorld from './helloworld';

function mount() {
  render(<AppContainer><HelloWorld /></AppContainer>, document.getElementById('application')); // eslint-disable-line
}

if(module.hot) {
  module.hot.accept('./helloworld', () => {
    const NextApp = require('./helloworld').default; // eslint-disable-line
    render(<AppContainer><NextApp /></AppContainer>, document.getElementById('application')); // eslint-disable-line

    mount();
  });
}

mount();