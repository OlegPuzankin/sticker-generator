import {createStore, combineReducers} from "redux";
import {alertReducer} from "./reducers/alertReducer";
import {createStickerReducer} from "./reducers/createStickerReducer";
import {alertSuccessReducer} from "./reducers/alertSuccessReducer";


// const composeEnhancers =
//     typeof window === 'object' &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
//         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const combinedReduces = combineReducers({
    // alert: alertReducer,
    // alertSuccess: alertSuccessReducer,
    sticker: createStickerReducer

});

export const store = createStore(combinedReduces,  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

window.store=store;

//export const store = createStore(combinedReduces, composeEnhancers(applyMiddleware(null)));