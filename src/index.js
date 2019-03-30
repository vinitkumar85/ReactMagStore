import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import productReducer from './reducers/productreducer';
import uiReducer from './reducers/uireducer';
import userReducer from './reducers/userreducer';
import {createStore , applyMiddleware, combineReducers} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form'

import registerServiceWorker from './registerServiceWorker';

const rootReducer = combineReducers({productReducer, form: formReducer, uiReducer, userReducer})

let store = createStore(rootReducer, applyMiddleware(thunk));


ReactDOM.render(
<Provider store={store}><App /></Provider>,
document.getElementById('root'));
registerServiceWorker();
