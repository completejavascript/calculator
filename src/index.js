import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App githubURL="https://github.com/completejavascript/calculator"/>, 
  document.getElementById('root')
);

registerServiceWorker();
