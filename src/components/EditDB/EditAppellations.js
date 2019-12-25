import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {
    addItemInCollection,
    getItemCollectionByName,
    loadAndSyncCollection,
    loadCollection
} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";
import {getAppellationsName, getCountriesName, getRegionsName} from "../../functions/utils";


const INITIAL_STATE = {

    countries: [],
    selectedCountry: '',

    regions: [],
    selectedRegion: '',
    filteredRegions: [],

    appellations: [],
    appellation: '',
    selectedAppellation: '',
    filteredAppellations: [],
    refreshTrigger: true,


};

function reducer(state, action) {
    switch (action.type) {

        case 'SET_COUNTRIES':

            return {...state, countries: action.payload};
        case 'SET_REGIONS':
            return {...state, regions: action.payload};
        case 'SET_APPELLATIONS':
            return {...state, appellations: action.payload};

        case 'SET_SELECTED_COUNTRY':
            return {...state, selectedCountry: action.payload};
        case 'SET_SELECTED_REGION':
            return {...state, selectedRegion: action.payload};
        case 'SET_SELECTED_APPELLATION':
            return {...state, selectedAppellation: action.payload};

        case 'SET_FILTERED_APPELLATIONS':
            return {...state, filteredAppellations: action.payload};

        case 'SET_FILTERED_REGIONS':
            return {...state, filteredRegions: action.payload};

        case 'SET_APPELLATION_VALUE':
            return {...state, appellation: action.payload};
        // case 'REFRESH':
        //     return {...state, refreshTrigger: !state.refreshTrigger};
        case 'RESET':
            return {...state, selectedAppellation: '', appellation: ''};


        default:
            return state
    }
}


export const EditAppellations = () => {

        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);




        //////////////////////////////////FUNCTIONS////////////////////////////

        async function loadData() {
            const countries = await loadCollection('countries');
            const regions = await loadCollection('regions');
            loadAndSyncCollection('appellations', dispatch, 'SET_APPELLATIONS');


            dispatch({type: 'SET_COUNTRIES', payload: countries});
            dispatch({type: 'SET_REGIONS', payload: regions});
        }

        function handleSelectCountry(e) {

            const selectedCountry = e.target.value;
            dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry});

            const filteredRegions = state.regions.filter(r => r.country === selectedCountry);
            if (filteredRegions.length > 0){
                dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions});
                dispatch({type: 'SET_SELECTED_REGION', payload: 'Select region'});
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload:[] });
            }
        }

        function handleSelectRegion(e) {

            const selectedRegion = e.target.value;
            dispatch({type: 'SET_SELECTED_REGION', payload: selectedRegion});


            const filteredAppellations = state.appellations.filter(a => a.region === selectedRegion);

            if (filteredAppellations.length > 0)
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: filteredAppellations});
            else
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: []})

        }

        function handleSelectAppellation(e) {
            dispatch({type: 'SET_SELECTED_APPELLATION', payload: e.target.value});
            dispatch({type: 'SET_APPELLATION_VALUE', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_APPELLATION_VALUE', payload: e.target.value})
        }





        //////////////////////////////////ADD APPELLATION/////////////////////////////////
        async function handleAddAppellation() {
            try {
                await addItemInCollection('appellations', {name: state.appellation, region: state.selectedRegion});
                dispatch({type: 'RESET'})

            } catch (e) {
                console.log(e.message)
            }
        }

        //////////////////////////////////UPDATE APPELLATION/////////////////////////////////
        async function handleUpdateAppellation() {


            const appellationRef = await getItemCollectionByName('appellations', state.selectedAppellation);
            appellationRef.update({name: state.appellation})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////HANDLE DELETE APPELLATION/////////////////////////////////
        async function handleDeleteAppellation() {

            const appellationRef = await getItemCollectionByName('appellations', state.selectedAppellation);

            appellationRef.delete()
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {

            loadData()

        }, []);


        /////////////////////////////////REFRESH APPELLATIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {
            const filteredAppellations = state.appellations.filter(a => a.region === state.selectedRegion);

            if (filteredAppellations.length > 0)
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: filteredAppellations})

        }, [state.appellations]);


///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);

        if(state.countries.length===0 && state.regions.length===0 && state.appellations.length===0 ){
            return <Loader/>
        }


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit appellations</div>

                        <ComboBoxGroup name='selectedCountry'
                                       value={state.selectedCountry}
                                       placeholder={'Select country'}
                                       items={getCountriesName(state.countries)}
                                       label={'Select country'}
                                       changeHandler={handleSelectCountry}/>

                        <ComboBoxGroup name='selectedRegion'
                                       value={state.selectedRegion}
                                       placeholder={'Select region'}
                                       items={getRegionsName(state.filteredRegions)}
                                       label={'Select region'}
                                       changeHandler={handleSelectRegion}/>

                        <ListBox
                            items={getAppellationsName(state.filteredAppellations)}
                            label={'Appellations'}
                            changeHandler={handleSelectAppellation}
                            name={'selectedAppellation'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'appellation'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={handleInputChange}
                                            value={state.appellation}
                                            label={'Appellation'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddAppellation}>Add
                                    appellation
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedAppellation.length===0}
                                        className='btn btn-info btn-block btn-sm' onClick={handleUpdateAppellation}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedAppellation.length===0}
                                        className='btn btn-danger btn-block btn-sm' onClick={handleDeleteAppellation}>Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
;