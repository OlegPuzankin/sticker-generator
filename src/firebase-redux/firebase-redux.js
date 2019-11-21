import {setCountriesData} from "../redux/actions/createStickerActions";
import firebase from '../firebase'
import {store} from '../redux/redux-strore'

const {dispatch}=store;

export function getInitialData (){
    return firebase.db.collection('countries')
        .orderBy('name', 'asc')
        .get()
        .then(snapshot => {
            //debugger
            const countries = snapshot.docs.map(doc => {
                return doc.data()

            });
            dispatch(setCountriesData(countries));
            //debugger

            const countryItems = countries.map(c => {
                return c.name
            });


            //debugger
            //setCountries(countryItems);

            debugger

        });
}