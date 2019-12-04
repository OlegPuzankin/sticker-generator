import React from 'react';


import {Home} from "./components/Home";
import {About} from "./staticPages/About";
import {Login} from "./components/Auth/Login";
import {Route, Switch} from "react-router-dom";
import {ForgotPassword} from "./components/Auth/ForgotPassword";
import {EditRegions} from "./components/EditDB/EditRegions";
import {EditCountries} from "./components/EditDB/EditCountries";
import {EditAppellations} from "./components/EditDB/EditAppellations";
import {EditGrapes} from "./components/EditDB/EditGrapes";
import {EditProducers} from "./components/EditDB/EditProducers";
import Navbar from "./components/Navbar/Navbar";
import {CreateSticker} from "./components/CreateStickerForm/CreateSticker";
import {Test} from "./staticPages/Test";
import {Preview} from "./components/Preview/Preview";

export const App = (props) => {




 return (
     <>
         <Navbar/>
         {/*<Header/>*/}
         <Switch>
             <Route exact path={'/'} component={Home}/>
             <Route path={'/about'} component={About}/>
             <Route path={'/create'} component={CreateSticker}/>
             <Route path={'/edit-countries'} component={EditCountries}/>
             <Route path={'/edit-regions'} component={EditRegions}/>
             <Route path={'/edit-appellations'} component={EditAppellations}/>
             <Route path={'/edit-grapes'} component={EditGrapes}/>
             <Route path={'/edit-producers'} component={EditProducers}/>
             <Route path={'/login'} component={Login}/>
             <Route path={'/forgot'} component={ForgotPassword}/>
             <Route path={'/preview'} component={Preview}/>
         </Switch>
     </>
 );
};