import {setAppellationsData, setCountriesData, setGrapesData, setRegionsData} from "../redux/actions/firebaseReduxActions";
import firebase from '../firebase'
import {store} from '../redux/redux-strore'


const {dispatch} = store;

export function getInitialData() {
    debugger


    const promiseGrapes =firebase.db.collection('grapes')
        .get()
        .then(snapshot=> {
            const grapes = snapshot.docs.map(doc => {
                return doc.data()
            });
            dispatch(setGrapesData(grapes))
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
        console.log('GET INITIAL DATA FINISH')
        }
    )
}