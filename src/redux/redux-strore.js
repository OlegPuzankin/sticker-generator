import {createStore, combineReducers, applyMiddleware} from "redux";
import {alertReducer} from "./reducers/alertReducer";
import {stickersReducer} from "./reducers/stickersReducer";
import {firebaseReduxReducer} from "./reducers/firebaseReduxReducer";
import {formStateReducer} from "./reducers/formStateReducer";
import {persistReducer, persistStore} from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

const middleware = [];

if(process.env.NODE_ENV==='development')
    middleware.push(logger)

// const persistConfig={
//     key: 'root',
//     storage,
//     whitelist:['stickers']
// };

// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const rootReducer = combineReducers({
    alert: alertReducer,
    stickers: stickersReducer,
    firebaseRedux: firebaseReduxReducer,
    formState: formStateReducer

});

// const rootPersistedReducers=persistReducer(persistConfig, rootReducer)
export const store = createStore(rootReducer, applyMiddleware(...middleware));

// export const persistor = persistStore(store);

//export default {store, persistor}
// window.store=store;
//export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(null)));