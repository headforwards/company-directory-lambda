import React from 'react';
import ReactDOM from 'react-dom';
import { AzureAD } from 'react-aad-msal';
import { authProvider } from './utils/authProvider';
import './index.css';
import App from './App';


ReactDOM.render(
    <AzureAD provider={authProvider} forceLogin={true}>
        <App />
    </AzureAD>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
