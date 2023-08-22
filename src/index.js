import React from 'react';
import './styles/index.css';
import { App } from './components';
import ReactDOM from 'react-dom/client';
import {ToastProvider} from 'react-toast-notifications';

const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render( 
<React.StrictMode>
  <ToastProvider autoDismiss autoDismissTimeout={5000} placement='top-left'>
    <App />
  </ToastProvider>
</React.StrictMode>
);

