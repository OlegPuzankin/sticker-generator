import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {addItemInCollection, getItemCollectionByName, loadAndSyncCollection} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";


const INITIAL_STATE = {
    countries: [],
    selectedCountry: '',

    region: '',
    regions: [],
    filteredRegions: [],
    selectedRegion: '',

    //refreshTrigger: true,
};

function reducer(state, action) {
    switch (action.type) {

        case 'SET_COUNTRIES':
            return {...state, countries: action.payload};
        case 'SET_REGIONS':
            return {...state, regions: action.payload};
        case 'SET_SELECTED_COUNTRY':
            return {...state, selectedCountry: action.payload};
        case 'SET_FILTERED_REGIONS':
            return {...state, filteredRegions: action.payload};
        case 'SET_SELECTED_REGION':
            return {...state, selectedRegion: action.payload};
        case 'SET_REGION_VALUE':
            return {...state, region: action.payload};
        // case 'REFRESH':
        //     return {...state, refreshTrigger: !state.refreshTrigger};
        case 'RESET':
            return {...state, selectedRegion: '', region: ''};


        default:
            return state
    }
}


export const EditRegions = () => {

        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);


        //////////////////////////////////FUNCTIONS////////////////////////////



        function handleSelectCountry(e) {

            const selectedCountry = e.target.value;
            dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry});

            const filteredRegions = state.regions.filter(r => r.country === selectedCountry);
            if (filteredRegions.length > 0)
                dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions})

        }

        function handleSelectRegion(e) {
            dispatch({type: 'SET_SELECTED_REGION', payload: e.target.value})
            dispatch({type: 'SET_REGION_VALUE', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_REGION_VALUE', payload: e.target.value})
        }


        function getCountriesName() {
            return state.countries.map(g => g.name);
        }

        function getRegionsName() {

            return state.filteredRegions.map(r => r.name);
        }


        //////////////////////////////////ADD REGION/////////////////////////////////
        async function handleAddRegion() {

            try {
                await addItemInCollection('regions', {name: state.region, country: state.selectedCountry});
                dispatch({type: 'RESET'})

            } catch (e) {
                console.log(e.message)
            }

        }

        //////////////////////////////////UPDATE REGION/////////////////////////////////
        async function handleUpdateRegion() {

            const regionRef = await getItemCollectionByName('regions', state.selectedRegion);
            regionRef.update({name: state.region})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE REGION/////////////////////////////////
        async function handleDeleteRegion() {

            const regionRef = await getItemCollectionByName('regions', state.selectedRegion);

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
            console.log('start load')


            loadAndSyncCollection('countries', dispatch, 'SET_COUNTRIES');
            loadAndSyncCollection('regions', dispatch, 'SET_REGIONS')

            console.log('end load')


        }, []);


        /////////////////////////////////REFRESH REGIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {


            const filteredRegions = state.regions.filter(r => r.country === state.selectedCountry);

            if (filteredRegions.length > 0)
                dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions})


        }, [state.regions]);




///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);

        if(state.countries.length===0 && state.regions.length===0){
            return <Loader/>
        }




        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit regions</div>


                        <ComboBoxGroup name='selectedCountry'
                                       placeholder={'Select country'}
                                       items={getCountriesName()}
                                       label={'Select country'}
                                       changeHandler={handleSelectCountry}/>

                        <ListBox
                            items={getRegionsName()}
                            label={'Regions'}
                            changeHandler={handleSelectRegion}
                            name={'selectedRegion'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'region'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={handleInputChange}
                                            value={state.region}
                                            label={'Region'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddRegion}>Add region
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-info btn-block btn-sm' onClick={handleUpdateRegion}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-danger btn-block btn-sm' onClick={handleDeleteRegion}>Delete
                                </button>
                            </div>

                        </div>
                    </div>


                </div>

            </div>

        );
    }
;