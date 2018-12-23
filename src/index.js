import React from 'react';
import ReactDOM from 'react-dom';
import Index from './components';
import * as serviceWorker from './serviceWorker';
import Model from './model';

const model = new Model()
ReactDOM.render(<Index model={model} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
