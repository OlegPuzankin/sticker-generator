import {setAppellationsData, setCountriesData, setGrapes, setRegionsData} from "../redux/actions/firebaseReduxActions";
import firebase from '../firebase'
import {store} from '../redux/redux-strore'
import {setCreateStickerPageIsLoading} from "../redux/actions/createStickerActions";

const {dispatch} = store;

export function getInitialData() {
    debugger

    dispatch(setCreateStickerPageIsLoading(true));

    const promiseGrapes =firebase.db.collection('grapes')
        .get()
        .then(snapshot=> {
            const grapes = snapshot.docs.map(doc => {
                return doc.data()
            });
            dispatch(setGrapes(grapes))
            console.log('GET INITIAL DATA GRAPES')

        })
        .catch(error=>{
            console.log(error.message)
        });



    const promiseCountries = firebase.db.collection('countries')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            //debugger
            const countries = snapshot.docs.map(doc => {
                return doc.data()
            });
            //debugger
            dispatch(setCountriesData(countries));
            console.log('GET INITIAL DATA COUNTRIES')

        })
        .catch(error => {
            console.log(error.message)
        })

    const promiseRegions = firebase.db.collection('regions')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            //debugger
            const regions = snapshot.docs.map(doc => {
                return doc.data()
            });
            //debugger
            dispatch(setRegionsData(regions));
            console.log('GET INITIAL DATA REGIONS')

        })
        .catch(error => {
            console.log(error.message)
        });

    const promiseAppellations = firebase.db.collection('appellations')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            //debugger
            const appellations = snapshot.docs.map(doc => {
                return doc.data()
            });
            //debugger
            dispatch(setAppellationsData(appellations));
            console.log('GET INITIAL DATA APPELLATIONS')

        })
        .catch(error => {
            console.log(error.message)
        })

    Promise.all([promiseGrapes, promiseCountries, promiseRegions, promiseAppellations]).then(()=>{
        dispatch(setCreateStickerPageIsLoading(false));
        console.log('GET INITIAL DATA FINISH')
        }
    )
}