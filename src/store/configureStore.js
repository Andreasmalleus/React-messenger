import {createStore, applyMiddleware} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import socketMiddleware from './middlewares/socketMiddleware.js';


import reducer from "./reducers/index.js";

const persistConfig = {
    key: 'root',
    storage,
};

export default function configureStore(socketClient){
    const middleWares = [socketMiddleware(socketClient), thunk];
    const persistedReducer = persistReducer(persistConfig, reducer);
    const store = createStore(persistedReducer, applyMiddleware(...middleWares));
    const persistor = persistStore(store);
    return {store, persistor}
}
