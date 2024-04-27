import React from 'react';
import { render } from 'react-dom';
import './index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CategoriesProvider } from './contexts/CategoriesContext';
import { CartContextProvider } from './contexts/CartContext';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
          <CategoriesProvider>
            <CartContextProvider>
              <App />
            </CartContextProvider>
          </CategoriesProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  rootElement
);
