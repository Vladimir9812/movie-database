import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter} from 'react-router-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';

const aplication = (
    <BrowserRouter><App /></BrowserRouter>
)
ReactDOM.render(aplication, document.getElementById('root'));

serviceWorker.unregister();
