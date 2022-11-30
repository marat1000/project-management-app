import React from 'react';
import ReactDOM from 'react-dom/client';
import './sass/style.scss';
import App from './App';
import { Provider } from 'react-redux';
import { store } from 'store';
import './common/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
