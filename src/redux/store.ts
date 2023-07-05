import thunkMiddleware from 'redux-thunk'
import {createLogger} from 'redux-logger';
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage/session'
import {configureStore} from '@reduxjs/toolkit';
import rootReducer from './index';

const loggerMiddleware = createLogger();

const persistConfig = {
    key: 'root',
    storage,
    whiteList: []
}

const persistedReducer = persistReducer({...persistConfig}, rootReducer);
const initialState = {};
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [
        thunkMiddleware,
        loggerMiddleware
    ],
    preloadedState: initialState
})

export const storePersisted = persistStore(store);