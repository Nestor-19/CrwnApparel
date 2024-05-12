import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import { rootReducer } from './rootReducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
    serializableCheck: false
  }).concat(middlewares)
})

export const persistor = persistStore(store);




