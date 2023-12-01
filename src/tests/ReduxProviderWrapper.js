import React from 'react';
import { Provider } from 'react-redux';
import { legacy_createStore as createStore, applyMiddleware} from 'redux';
import rootReducer from '../modules/rootReducer';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunk, logger));

const ReduxProviderWrapper = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProviderWrapper;