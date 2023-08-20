import React from 'react';
import './styles/index.css';
import { App } from './components';
import ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render( 
<React.StrictMode>
  <App />
</React.StrictMode>,
document.getElementById('root')
);

