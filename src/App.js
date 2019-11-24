import React from 'react';

import {Alert} from "./UI/Alert";
import {Home} from "./components/Home";
import {About} from "./staticPages/About";
import {CreateSticker} from "./components/CreateStickerForm/CreateSticker";
import {Login} from "./components/Auth/Login";
import {Route, Switch} from "react-router-dom";
import {useSelector} from "react-redux";
import Header from "./components/Navbar/Header";
import {EditDB} from "./components/EditDB/EditDB";
import {ForgotPassword} from "./components/Auth/ForgotPassword";

export const App = (props) => {




 return (
     <>
         {/*<Navbar/>*/}
         <Header/>
         <Switch>
             <Route exact path={'/'} component={Home}/>
             <Route path={'/about'} component={About}/>
             <Route path={'/create'} component={CreateSticker}/>
             <Route path={'/editDB'} component={EditDB}/>
             <Route path={'/login'} component={Login}/>
             <Route path={'/forgot'} component={ForgotPassword}/>
         </Switch>
     </>
 );
};