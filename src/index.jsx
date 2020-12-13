const React = require('react');
const ReactDom = require('react-dom');
import {Provider} from 'react-redux';
import App from "./App.jsx";
import configureStore from "./store/configureStore.js";
import SocketClient from "./store/socketClient.js";
import { PersistGate } from 'redux-persist/integration/react'

const socketClient = new SocketClient()
const {store, persistor} = configureStore(socketClient)

const root = document.getElementById('root');

ReactDom.render(
    <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
            <App/>
        </PersistGate>
    </Provider>
, root);

