import React from 'react';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import * as serviceWorker from './serviceWorker';
import dotenv from 'dotenv'
import Layout from './layout';
import './css/app.css'
dotenv.config();
ReactDOM.render(
  <Layout />,
  document.getElementById('root')
);
serviceWorker.register();
