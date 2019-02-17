import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/component/App';

const serverRender = () => {
      return {
        initialMarkup : ReactDOMServer.renderToString(
          <App />
        )
      };
};
// const serverRender = {
//   initialMarkup : ReactDOMServer.renderToString(<App />)
// };
// console.log(serverRender.initialMarkup);

export default serverRender;
