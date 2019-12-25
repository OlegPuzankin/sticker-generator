import React from 'react';
import {BrowserRouter} from "react-router-dom";
import {Provider, useDispatch} from "react-redux";
import {store, persistor} from "./redux/redux-strore";
import firebase, {FirebaseContext} from './firebase'
import {App} from "./App";
import useAuth from "./components/Auth/useAuth";
import {PersistGate} from 'redux-persist/integration/react'
import {loadCollection} from "./firebase/firebaseFunctions";
import {setCountriesData} from "./redux/actions/firebaseReduxActions";


//import {show} from "./redux/actions/alertActions";




function StickerGeneratorApp() {
    const user = useAuth();



    return (

        <Provider store={store}>
            <BrowserRouter>
                <FirebaseContext.Provider value={{firebase, user}}>
                    <PersistGate loading={null} persistor={persistor}>
                        <App/>
                    </PersistGate>
                </FirebaseContext.Provider>
            </BrowserRouter>
        </Provider>


    );
}

export default StickerGeneratorApp;
