import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";
import {Loader} from "../../UI/Loader";
import {addItemInCollection, getItemCollectionByName, loadAndSyncCollection} from "../../firebase/firebaseFunctions";


const INITIAL_STATE = {

    country: '',
    selectedCountry: '',
    countries: []

};

function reducer(state, action) {
    switch (action.type) {

        case 'SET_COUNTRIES':
            return {...state, countries: action.payload};
        case 'SET_SELECTED_COUNTRY':
            return {...state, selectedCountry: action.payload, country: action.payload};
        case 'SET_COUNTRY_VALUE':
            return {...state, country: action.payload};
        case 'RESET':
            return {...state, country: ''};


        default:
            return state
    }
}


export const EditCountries = () => {

        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

        //////////////////////////////////ADD COUNTRY/////////////////////////////////
        async function handleAddCountries() {
            try {
                await addItemInCollection('countries', {name: state.country})
                //await producersRef.add({name: state.producer});
                dispatch({type: 'RESET'})
            } catch (e) {
                console.log(e.message)
            }

        }

        //////////////////////////////////UPDATE COUNTRY/////////////////////////////////
        async function handleUpdateCountry() {


            const countryRef = await getItemCollectionByName('countries', state.selectedCountry)

            countryRef.update({name: state.country})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE COUNTRY/////////////////////////////////
        async function handleDeleteCountry() {

            const countryRef = await getItemCollectionByName('countries', state.selectedCountry)
            countryRef.delete()
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            loadAndSyncCollection('countries', dispatch, 'SET_COUNTRIES')

        }, []);



///////////////////////////////////////FUNCTIONS//////////////////////////////////////////////
        function getCountriesName() {
            return state.countries.map(c => c.name);
        }

        function handleSelectCountry(e) {
            dispatch({type: 'SET_SELECTED_COUNTRY', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_COUNTRY_VALUE', payload: e.target.value})
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-1'>Edit countries</div>

                        <ListBox
                            items={getCountriesName()}
                            // label={'Countries'}
                            changeHandler={handleSelectCountry}
                            name={'selectedCountry'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'country'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={handleInputChange}
                                    //handleBlur={handleBlur}
                                            value={state.country}
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

