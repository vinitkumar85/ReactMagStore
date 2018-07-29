import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import productReducer from './reducers/productreducer';
import {createStore , applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import registerServiceWorker from './registerServiceWorker';

let store = createStore(productReducer, {}, applyMiddleware(thunk));


ReactDOM.render(
<Provider store={store}><App /></Provider>,
document.getElementById('root'));
registerServiceWorker();
