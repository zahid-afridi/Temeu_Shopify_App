
import { thunk } from 'redux-thunk';

import {composeWithDevTools} from 'redux-devtools-extension';
import {legacy_createStore as createStore, applyMiddleware} from 'redux';
import reducer from './reducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducer, composedEnhancer);

