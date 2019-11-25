import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";


const INITIAL_STATE = {

    country: '',
    editCountry: '',
    selectedCountry: ''

};


export const EditCountries = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const countriesRef = firebase.db.collection('countries');

        const [countries, setCountries] = React.useState([]);
        // const [grape, setGrape] = React.useState({});
        // const [selectedGrape, setSelectedGrape] = React.useState('');
        // const [grapeId, setGrapeId] = React.useState(null);


        const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
            useFormValidation(INITIAL_STATE, validateEditDB);

        function getCountryByName(name) {
            //debugger
            return countriesRef
                .where('name', '==', name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        return querySnapshot.docs[0].ref
                    }
                })
        }

        //////////////////////////////////ADD COUNTRY/////////////////////////////////
        async function handleAddCountries() {
            const response = await countriesRef.add({name: values.country});
            //countriesRef.doc(response.id).update({id: response.id});
            setValues(INITIAL_STATE)
        }

        //////////////////////////////////UPDATE COUNTRY/////////////////////////////////
        async function handleUpdateCountry() {

            const countryRef = await getCountryByName(values.editCountry);
        debugger
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

            const countryRef = await getCountryByName(values.editCountry);
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

            //setValues({...values, grape: values.selectedGrape});
        debugger

            const result = countries.filter(c => c.name === values.selectedCountry);
            if (result.length > 0)
                setValues({...values, editCountry: result[0].name, country: values.selectedCountry})

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

            <div>

                <ListBox
                    items={getCountriesName()}
                    label={'Countries'}
                    changeHandler={changeHandler}
                    name={'selectedCountry'}/>

                <div className='row'>

                    <div className='col-12'>
                        <InputGroup name={'country'}
                                    type={'text'}
                                    labelWidth={100}
                                    changeHandler={changeHandler}
                            //handleBlur={handleBlur}
                                    value={values.country}
                                    error={errors['country']}
                                    label={'Country'}/>
                    </div>


                    {/*<div className='col-9'>*/}
                    {/*    <input type='text'*/}
                    {/*           name={'grape'}*/}
                    {/*           value={values.grape}*/}
                    {/*           className='form-control'*/}
                    {/*           onChange={changeHandler}*/}
                    {/*           placeholder={'Enter grape'}/>*/}
                    {/*</div>*/}

                    <div className='col'>
                        <button className='btn btn-primary btn-block btn-sm' onClick={handleAddCountries}>Add country
                        </button>
                    </div>

                    <div className='col'>
                        <button className='btn btn-primary btn-block btn-sm' onClick={handleUpdateCountry}>Update
                        </button>
                    </div>

                    <div className='col'>
                        <button className='btn btn-primary btn-block btn-sm' onClick={handleDeleteCountry}>Delete
                        </button>
                    </div>

                </div>

            </div>

        );
    }
;