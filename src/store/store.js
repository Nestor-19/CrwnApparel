import { compose, applyMiddleware } from 'redux';
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';

import { rootReducer } from './rootReducer';

const middleWares = [process.env.NODE_ENV === 'development' && logger].filter(
  Boolean
);

const composedEnhancers = compose(applyMiddleware(...middleWares));

export const store = configureStore({
    reducer: rootReducer, 
    composedEnhancers
});

// export const store = createStore(rootReducer, undefined, composedEnhancers);




