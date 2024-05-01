import { configureStore, Tuple } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';

const middlewares = [logger];

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});





