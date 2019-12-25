import React from 'react';


import {StickerCatalog} from "./components/StickerCatalog";
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
import {Preview} from "./components/Preview/Preview";
import {CreateSticker2} from "./components/CreateStickerForm/CreateSticker2";
import {CreateEditSticker} from "./components/CreateStickerForm/CreateEditSticker";
import {useDispatch, useSelector} from "react-redux";
import {loadCollection} from "./firebase/firebaseFunctions";
import {
    setAppellationsData,
    setCountriesData,
    setGrapesData, setHarvestYears, setLoading,
    setProducersData,
    setRegionsData
} from "./redux/actions/firebaseReduxActions";
import {Loader} from "./UI/Loader";

export const App = (props) => {

    const dispatch = useDispatch();

    ////////////////////////LOAD DATA FROM FIREBASE EFFECT//////////////////////////////////////////
    React.useEffect(() => {
        // console.log('load data effect');

        async function loadCollections() {

            dispatch(setLoading(true));

            const countries = await loadCollection('countries');
            const regions = await loadCollection('regions');
            const appellations = await loadCollection('appellations');
            const producers = await loadCollection('producers');
            const grapes = await loadCollection('grapes');
            const harvestYears = await loadCollection('harvest');

            debugger

            dispatch(setCountriesData(countries));
            dispatch(setRegionsData(regions));
            dispatch(setAppellationsData(appellations));
            dispatch(setProducersData(producers));
            dispatch(setGrapesData(grapes));
            dispatch(setHarvestYears(harvestYears));

            dispatch(setLoading(false))

        }

        const promise = loadCollections();

        return () => promise;

    }, [loadCollection]);




 return (
     <>
         <Navbar/>
         {/*<Header/>*/}
         <Switch>
             <Route exact path={'/'} component={StickerCatalog}/>
             <Route path={'/about'} component={About}/>
             <Route path={'/create'} component={CreateEditSticker}/>
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