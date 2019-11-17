import React from 'react';
import {Navbar} from "./components/Navbar";
import {Alert} from "./UI/Alert";
import {Home} from "./components/Home";
import {About} from "./staticPages/About";
import {CreateSticker} from "./components/CreateStickerForm/CreateSticker";
import {Login} from "./components/Auth/Login";
import {Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import {Header} from "./components/Navbar/Header";

export const App = (props) => {

    const alert = useSelector(state => state.alert);


 return (
     <>
         {/*<Navbar/>*/}
         <Header/>
         <Alert alert={alert}/>
         <Switch>
             <Route exact path={'/'} component={Home}/>
             <Route path={'/about'} component={About}/>
             <Route path={'/create'} component={CreateSticker}/>
             <Route path={'/login'} component={Login}/>
         </Switch>
     </>
 );
};