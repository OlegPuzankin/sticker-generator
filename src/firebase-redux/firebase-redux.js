import {setCountriesData, setGrapes} from "../redux/actions/firebaseReduxActions";
import firebase from '../firebase'
import {store} from '../redux/redux-strore'
import {setCreateStickerPageIsLoading} from "../redux/actions/createStickerActions";

const {dispatch} = store;

export function getInitialData() {

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

    Promise.all([promiseGrapes, promiseCountries]).then(()=>{
        dispatch(setCreateStickerPageIsLoading(false));
        }
    )
}