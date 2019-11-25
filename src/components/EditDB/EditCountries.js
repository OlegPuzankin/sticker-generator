import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";


const INITIAL_STATE = {

    country: '',
    selectedCountry: ''

};


export const EditCountries = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const countriesRef = firebase.db.collection('countries');

        const [countries, setCountries] = React.useState([]);
        const [values, setValues] = React.useState(INITIAL_STATE)
        // const [grape, setGrape] = React.useState({});
        // const [selectedGrape, setSelectedGrape] = React.useState('');
        // const [grapeId, setGrapeId] = React.useState(null);


        // const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
        //     useFormValidation(INITIAL_STATE, validateEditDB);

        /////////////////////////////////FUNCTIONS///////////////////////////////
        function getCountryByName(name) {

            return countriesRef
                .where('name', '==', name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        return querySnapshot.docs[0].ref
                    }
                })
        }

        function changeHandler(e) {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        //////////////////////////////////ADD COUNTRY/////////////////////////////////
        async function handleAddCountries() {
            try {
                await countriesRef.add({name: values.country});
                setValues(INITIAL_STATE)
            } catch (e) {
                console.log(e.message)
            }

        }

        //////////////////////////////////UPDATE COUNTRY/////////////////////////////////
        async function handleUpdateCountry() {
            debugger

            const countryRef = await getCountryByName(values.selectedCountry);

            countryRef.update({name: values.country})
                .then(() => {
                    setValues(INITIAL_STATE)
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE COUNTRY/////////////////////////////////
        async function handleDeleteCountry() {

            const countryRef = await getCountryByName(values.selectedCountry);
            countryRef.delete()
                .then(() => {
                    setValues(INITIAL_STATE)
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            countriesRef
                .orderBy('name')
                .onSnapshot(snapshot => {
                    const countries = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setCountries(countries);
                })
        }, []);

///////////////////////////////HANDLE SELECT COUNTRY FROM LIST EFFECT//////////////////

        React.useEffect(() => {
            const result = countries.filter(c => c.name === values.selectedCountry);
            if (result.length > 0)
                setValues({...values, country: values.selectedCountry})

        }, [values.selectedCountry]);

///////////////////////////////////////FUNCTIONS//////////////////////////////////////////////
        function getCountriesName() {
            return countries.map(g => g.name);
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('values', values);
        //console.log('grapeId', grapeId);
//console.log('grapeRef', grapeRef)


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-1'>Edit countries</div>

                        <ListBox
                            items={getCountriesName()}
                            // label={'Countries'}
                            changeHandler={changeHandler}
                            name={'selectedCountry'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'country'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={changeHandler}
                                    //handleBlur={handleBlur}
                                            value={values.country}
                                    // error={errors['country']}
                                            label={'Country'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddCountries}>Add
                                    country
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-info btn-block btn-sm' onClick={handleUpdateCountry}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-danger btn-block btn-sm' onClick={handleDeleteCountry}>Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;