import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/redux-strore";
import firebase, {FirebaseContext} from './firebase'
import {App} from "./App";
import useAuth from "./components/Auth/useAuth";

function StickerGeneratorApp() {
    const user = useAuth();
    // console.log('user', user)
    return (

        <Provider store={store}>
            <BrowserRouter>
                <FirebaseContext.Provider value={{firebase, user}}>
                    <App/>
                </FirebaseContext.Provider>
            </BrowserRouter>
        </Provider>
    );
}

export default StickerGeneratorApp;
