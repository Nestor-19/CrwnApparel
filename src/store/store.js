import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    serializableCheck: false
  }).concat(middlewares)
})




