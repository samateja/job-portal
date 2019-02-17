import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/App'

/**
 * Server Render React :)
 */
ReactDOM.hydrate(
  <App />,
  document.getElementById('root')
);