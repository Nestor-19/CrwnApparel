import { configureStore, Tuple } from "@reduxjs/toolkit";
import {persistStore, persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';

const middlewares = [logger];

const persistConfig = {
  key: 'root',
  storage,
}

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares),
  devTools: process.env.NODE_ENV !== 'production',
});





