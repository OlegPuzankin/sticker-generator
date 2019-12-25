import {createStore, combineReducers} from "redux";
import {alertReducer} from "./reducers/alertReducer";
import {stickersReducer} from "./reducers/stickersReducer";
import {firebaseReduxReducer} from "./reducers/firebaseReduxReducer";
import {stickerStateReducer} from "./reducers/stickerStateReducer";
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'


const persistConfig={
    key: 'root',
    storage,
    whitelist:['stickers']
};


// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const rootReducer = combineReducers({
    alert: alertReducer,
    stickers: stickersReducer,
    firebaseRedux: firebaseReduxReducer,
    stickerState: stickerStateReducer

});

const rootPersistedReducers=persistReducer(persistConfig, rootReducer)



export const store = createStore(rootPersistedReducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export const persistor = persistStore(store);

//export default {store, persistor}



window.store=store;

//export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(null)));