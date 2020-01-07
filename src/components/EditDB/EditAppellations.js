import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {
    addItemInCollection, getItemCollectionById,
    loadAndSyncCollection,
    loadCollection, setRegion
} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";
import {ComboBoxGroupFullState} from "../../UI/ComboBoxGroupFullState";


const INITIAL_STATE = {

    countries: [],
    selectedCountryId: '',


    regions: [],
    selectedRegion: '',
    selectedRegionId: '',
    filteredRegions: [],

    appellations: [],
    appellation: '',
    selectedAppellationId: '',
    filteredAppellations: [],
};

function reducer(state, action) {
    const {payload} = action;
    switch (action.type) {

        case 'SET_COUNTRIES':
            return {...state, countries: payload};
        case 'SET_REGIONS':
            return {...state, regions: payload};
        case 'SET_APPELLATIONS':
            return {...state, appellations: payload};

        case 'SET_SELECTED_COUNTRY_ID':
            return {...state, selectedCountryId: payload};
        case 'SET_SELECTED_REGION': {
            const {id, name} = payload;
            return {...state, selectedRegion: name, selectedRegionId: id};
        }
        case 'SET_SELECTED_APPELLATION':
            const {id, name} = payload;
            return {...state, selectedAppellationId: id, appellation: name};

        case 'SET_FILTERED_APPELLATIONS':
            return {...state, filteredAppellations: payload};

        case 'SET_FILTERED_REGIONS':
            return {...state, filteredRegions: payload, appellation: '', filteredAppellations: []};

        case 'SET_APPELLATION_VALUE':
            return {...state, appellation: payload};

        case 'RESET':
            return {...state,
                selectedAppellationId: '',
                appellation: '',
                selectedCountryId: '',
                selectedRegionId:'',
                selectedRegion: '',
                filteredRegions:[],
                filteredAppellations:[]
            };


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

            const selectedCountryId = e.target.value;
            const selectedCountry = state.countries.find(c => c.id === selectedCountryId);
            if (selectedCountry) {

                dispatch({type: 'SET_SELECTED_COUNTRY_ID', payload: selectedCountryId});

                const filteredRegions = state.regions.filter(r => r.countryId === selectedCountryId);
                if (filteredRegions.length > 0) {
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions});
                } else
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: []});

            }
            else
                dispatch({type: 'RESET'})

        }

        function handleSelectRegion(e) {

            const selectedRegionId = e.target.value;
            const selectedRegion = state.regions.find(r => r.id === selectedRegionId);
            if (selectedRegion) {
                dispatch({type: 'SET_SELECTED_REGION', payload: selectedRegion});
                const filteredAppellations = state.appellations.filter(a => a.regionId === selectedRegionId);
                if (filteredAppellations.length > 0)
                    dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: filteredAppellations});
                else
                    dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: []})
            }
        }

        function handleSelectAppellation(e) {
            const selectedAppellation = state.appellations.find(a => a.id === e.target.value);
            dispatch({type: 'SET_SELECTED_APPELLATION', payload: selectedAppellation});
            // dispatch({type: 'SET_APPELLATION_VALUE', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_APPELLATION_VALUE', payload: e.target.value})
        }


        //////////////////////////////////ADD APPELLATION/////////////////////////////////
        async function handleAddAppellation() {
            try {
                await addItemInCollection('appellations',
                    {name: state.appellation, regionId: state.selectedRegionId, region: state.selectedRegion});
                dispatch({type: 'RESET'})

            } catch (e) {
                console.log('error', e.message)
            }
        }

        //////////////////////////////////UPDATE APPELLATION/////////////////////////////////
        async function handleUpdateAppellation() {


            const appellationRef = await getItemCollectionById('appellations', state.selectedAppellationId);
            appellationRef.update({name: state.appellation, regionId: state.selectedRegionId})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log('error', error.message)
                })

        }

//////////////////////////////////HANDLE DELETE APPELLATION/////////////////////////////////
        async function handleDeleteAppellation() {

            const appellationRef = await getItemCollectionById('appellations', state.selectedAppellationId);

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
            loadData().catch(e => alert(e.message))
            // setRegion();
        }, []);


        /////////////////////////////////REFRESH APPELLATIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {
            const filteredAppellations = state.appellations.filter(a => a.regionId === state.selectedRegionId);

            if (filteredAppellations.length > 0)
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: filteredAppellations});
            else
                dispatch({type: 'SET_FILTERED_APPELLATIONS', payload: []})

        }, [state.appellations]);


///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);

        if (state.countries.length === 0 && state.regions.length === 0 && state.appellations.length === 0) {
            return <Loader/>
        }


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit appellations</div>

                        <ComboBoxGroupFullState name='selectedCountry'
                                                value={state.selectedCountryId}
                                                placeholder={'Select country'}
                                                items={state.countries}
                                                label={'Select country'}
                                                onChange={handleSelectCountry}/>

                        <ComboBoxGroupFullState name='selectedRegion'
                                                value={state.selectedRegionId}
                                                placeholder={'Select region'}
                                                items={state.filteredRegions}
                                                label={'Select region'}
                                                onChange={handleSelectRegion}/>

                        <ListBox
                            multiple={true}
                            items={state.filteredAppellations}
                            label={'Appellations'}
                            onChange={handleSelectAppellation}
                            height={200}
                            name={'selectedAppellation'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'appellation'}
                                            type={'text'}
                                            labelWidth={200}
                                            onChange={handleInputChange}
                                            value={state.appellation}
                                            label={'Appellation'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddAppellation}>Add
                                    appellation
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedAppellationId.length === 0}
                                        className='btn btn-info btn-block btn-sm' onClick={handleUpdateAppellation}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedAppellationId.length === 0}
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