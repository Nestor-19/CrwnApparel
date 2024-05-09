import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { rootReducer } from './rootReducer';

// const persistConfig = {
  // key: 'root',
  // storage,
  // whitelist: ['cart' ],
// };
// 
// const sagaMiddleware = createSagaMiddleware();
// 
// const persistedReducer = persistReducer(persistConfig, rootReducer);
// 

const middlewares = [
  process.env.NODE_ENV !== 'production' && logger,
].filter(Boolean);

export const store = configureStore({
  reducer: rootReducer,
  // middleware: middlewares
});

// sagaMiddleware.run(rootSaga);
// 
// export const persistor = persistStore(store);





