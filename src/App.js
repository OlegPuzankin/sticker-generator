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
import {CreateEditSticker} from "./components/CreateStickerForm/CreateEditSticker";
import {useDispatch, useSelector} from "react-redux";
import {loadCollection, loadStickers} from "./firebase/firebaseFunctions";
import {
    setAppellationsData,
    setCountriesData,
    setGrapesData, setHarvestYears, setLoading,
    setProducersData,
    setRegionsData
} from "./redux/actions/firebaseReduxActions";
import {setStickersAction} from "./redux/actions/stickersActions";
import {selectStickersBundle} from "./redux/selectors/stickers-selectors";
import {Preview2} from "./components/Preview/Preview2";

export const App = (props) => {

    const dispatch = useDispatch();
    const stickersBundle = useSelector(selectStickersBundle);

    async function loadAndSyncStickersState(){
        const response = await loadStickers();
        const stickers = response.map(s => {
            return {...s, isAddedToBundle: false}
        });

        dispatch(setStickersAction(stickers));

        if (stickersBundle.length > 0) {
            stickers.forEach(s => {
                stickersBundle.forEach(sb => {
                    if (s.id === sb.id) {
                        s.isAddedToBundle = true
                    }
                })
            })
        }
        dispatch(setStickersAction(stickers));
    }


    ////////////////////////LOAD DATA FROM FIREBASE EFFECT//////////////////////////////////////////
    React.useEffect(() => {
        // console.log('load data effect');

        async function loadCollections() {

            dispatch(setLoading(true));

            await loadAndSyncStickersState();
            //debugger

            const countries = await loadCollection('countries');
            const regions = await loadCollection('regions');
            const appellations = await loadCollection('appellations');
            const producers = await loadCollection('producers');
            const grapes = await loadCollection('grapes');
            const harvestYears = await loadCollection('harvest');

            //debugger

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

    }, []);




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
             <Route path={'/preview'} component={Preview2}/>
         </Switch>
     </>
 );
};