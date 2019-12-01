import {createStore, combineReducers} from "redux";
import {alertReducer} from "./reducers/alertReducer";
import {stickersReducer} from "./reducers/stickersReducer";
import {firebaseReduxReducer} from "./reducers/firebaseReduxReducer";


// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const combinedReduces = combineReducers({
    alert: alertReducer,
    stickers: stickersReducer,
    firebaseRedux: firebaseReduxReducer,

});

export const store = createStore(combinedReduces,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store=store;

//export const store = createStore(combinedReduces, composeEnhancers(applyMiddleware(null)));