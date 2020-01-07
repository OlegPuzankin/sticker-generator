import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {
    addItemInCollection,
    getItemCollectionById,
    loadAndSyncCollection
} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";
import {ComboBoxGroupFullState} from "../../UI/ComboBoxGroupFullState";


const INITIAL_STATE = {
    countries: [],
    selectedCountryId: '',
    selectedCountry: '',

    region: '',
    regions: [],
    filteredRegions: [],
    selectedRegionId: '',

    //refreshTrigger: true,
};

function reducer(state, action) {

    const {payload} = action;
    switch (action.type) {

        case 'SET_COUNTRIES':
            return {...state, countries: payload};
        case 'SET_REGIONS':
            return {...state, regions: payload};
        case 'SET_SELECTED_COUNTRY': {
            const {id, name} = payload;
            return {...state, selectedCountryId: id, selectedCountry: name, selectedRegionId: ''};
        }
        case 'SET_FILTERED_REGIONS':
            return {...state, filteredRegions: payload, region: ''};
        case 'SET_SELECTED_REGION':
            const {id, name} = payload;
            return {...state, selectedRegionId: id, region: name};
        case 'SET_REGION_VALUE':
            return {...state, region: payload};
        case 'RESET':
            return {...state, selectedRegionId: '', region: ''};

        default:
            return state
    }
}


export const EditRegions = () => {

        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);


        //////////////////////////////////FUNCTIONS////////////////////////////


        function handleSelectCountry(e) {

            const selectedCountryId = e.target.value;
            const selectedCountry = state.countries.find(c => c.id === selectedCountryId);
            if (selectedCountry) {
                dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry});
                const filteredRegions = state.regions.filter(r => r.countryId === selectedCountryId);
                if (filteredRegions.length > 0)
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions})
                else
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: []})
            }
        }

        function handleSelectRegion(e) {
            const selectedRegion = state.regions.find(r => r.id === e.target.value);
            if (selectedRegion)
                dispatch({type: 'SET_SELECTED_REGION', payload: selectedRegion})
            // dispatch({type: 'SET_REGION_VALUE', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_REGION_VALUE', payload: e.target.value})
        }

        //////////////////////////////////ADD REGION/////////////////////////////////
        async function handleAddRegion() {

            try {
                await addItemInCollection('regions',
                    {name: state.region, countryId: state.selectedCountryId, country: state.selectedCountry});
                dispatch({type: 'RESET'})

            } catch (e) {
                console.log(e.message)
            }

        }

        //////////////////////////////////UPDATE REGION/////////////////////////////////
        async function handleUpdateRegion() {

            const regionRef = await getItemCollectionById('regions', state.selectedRegionId);
            regionRef.update({name: state.region, countryId: state.selectedCountryId})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE REGION/////////////////////////////////
        async function handleDeleteRegion() {

            const regionRef = await getItemCollectionById('regions', state.selectedRegionId);

            regionRef.delete()
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            // console.log('start load')


            loadAndSyncCollection('countries', dispatch, 'SET_COUNTRIES');
            loadAndSyncCollection('regions', dispatch, 'SET_REGIONS')

            // console.log('end load')


        }, []);


        /////////////////////////////////REFRESH REGIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {


            const filteredRegions = state.regions.filter(r => r.countryId === state.selectedCountryId);

            if (filteredRegions.length > 0)
                dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions})


        }, [state.regions]);


///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);

        if (state.countries.length === 0 && state.regions.length === 0) {
            return <Loader/>
        }

        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit regions</div>


                        <ComboBoxGroupFullState
                            name='selectedCountry'
                            value={state.selectedCountryId}
                            placeholder={'Select country'}
                            items={state.countries}
                            label={'Select country'}
                            onChange={handleSelectCountry}/>

                        <ListBox
                            multiple={true}
                            items={state.filteredRegions}
                            label={'Regions'}
                            onChange={handleSelectRegion}
                            height={300}
                            name={'selectedRegion'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'region'}
                                            type={'text'}
                                            labelWidth={100}
                                            onChange={handleInputChange}
                                            value={state.region}
                                            label={'Region'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddRegion}>Add region
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedRegionId.length === 0}
                                        className='btn btn-info btn-block btn-sm' onClick={handleUpdateRegion}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedRegionId.length === 0}
                                        className='btn btn-danger btn-block btn-sm' onClick={handleDeleteRegion}>Delete
                                </button>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        );
    }
;