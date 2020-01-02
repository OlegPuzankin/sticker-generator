import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";
import {Loader} from "../../UI/Loader";
import {
    addItemInCollection,
    getItemCollectionById,
    getItemCollectionByName,
    loadAndSyncCollection
} from "../../firebase/firebaseFunctions";


const INITIAL_STATE = {

    country: '',
    selectedCountryId: '',
    countries: []

};

function reducer(state, action) {
    const {payload}=action;
    switch (action.type) {

        case 'SET_COUNTRIES':
            return {...state, countries: payload};
        case 'SET_SELECTED_COUNTRY':
            const {id, name}=payload;
            return {...state, selectedCountryId: id, country: name};
        case 'SET_COUNTRY_VALUE':
            return {...state, country: payload};
        case 'RESET':
            return {...state, country: '', selectedCountryId: '' };


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
            const countryRef = await getItemCollectionById('countries', state.selectedCountryId);
            debugger
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
            const countryRef = await getItemCollectionById('countries', state.selectedCountryId);
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
            const target = e.target.value;
            const selectedCountry = state.countries.find(c=>c.id===target);
            debugger
            console.log(selectedCountry);
            dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry})
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
                            //items={getCountriesName()}
                            items={state.countries}
                            // label={'Countries'}
                            changeHandler={handleSelectCountry}
                            height={350}
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
                                <button disabled={state.selectedCountryId.length===0} className='btn btn-info btn-block btn-sm' onClick={handleUpdateCountry}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedCountryId.length===0} className='btn btn-danger btn-block btn-sm' onClick={handleDeleteCountry}>Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;

