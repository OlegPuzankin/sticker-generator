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
import {useDispatch, useSelector} from "react-redux";
import {selectAppellations, selectCountries, selectRegions} from "../../redux/selectors/firebase-redux-selectors";
import {Transition} from "react-transition-group";
import {Alert} from "../../UI/Alert";
import {hideAlert, showAlert} from "../../redux/actions/alertActions";
import {SET_REGIONS} from "../../redux/types";


const INITIAL_STATE = {
    selectedCountryId: '',
    selectedCountry: '',
    region: '',
    filteredRegions: [],
    selectedRegionId: '',
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

        const countries = useSelector(selectCountries);
        const regions = useSelector(selectRegions);
        const appellations = useSelector(selectAppellations);

        const alertState = useSelector(state => state.alert);
        const dispatchRedux = useDispatch();


        //////////////////////////////////FUNCTIONS////////////////////////////


        function handleSelectCountry(e) {

            const selectedCountryId = e.target.value;
            const selectedCountry = countries.find(c => c.id === selectedCountryId);
            if (selectedCountry) {
                dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry});
                const filteredRegions = regions.filter(r => r.countryId === selectedCountryId);
                if (filteredRegions.length > 0)
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions});
                else
                    dispatch({type: 'SET_FILTERED_REGIONS', payload: []})
            }
        }

        function handleSelectRegion(e) {
            const selectedRegion = regions.find(r => r.id === e.target.value);
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
            regionRef.update({name: state.region, countryId: state.selectedCountryId, country: state.selectedCountry})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

        /////////////////////////////DELETE REGION/////////////////////////////////
        async function handleDeleteRegion() {

            const hasRegionAppellations = !!appellations.find(a => a.regionId === state.selectedRegionId);
            if (hasRegionAppellations) {
                dispatchRedux(showAlert('Region can not be deleted because has appellations ', 'danger'));
                setTimeout(() => {
                    dispatchRedux(hideAlert());
                }, 4500);
            } else {
                const regionRef = await getItemCollectionById('regions', state.selectedRegionId);
                regionRef.delete()
                    .then(() => {
                        dispatch({type: 'RESET'})
                    })
                    .catch(error => {
                        console.log(error.message)
                    })
            }
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            const unsubscribe = loadAndSyncCollection('regions',
                (data) => dispatchRedux({type: SET_REGIONS, payload: data}));

            return () => {
                unsubscribe()
            }
        }, []);


        /////////////////////////////////REFRESH REGIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {


            const filteredRegions = regions.filter(r => r.countryId === state.selectedCountryId);

            if (filteredRegions.length > 0)
                dispatch({type: 'SET_FILTERED_REGIONS', payload: filteredRegions});
            else
                dispatch({type: 'SET_FILTERED_REGIONS', payload: []})


        }, [regions]);


///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);

        if (countries.length === 0 && regions.length === 0) {
            return <Loader/>
        }

        return (

            <div className='container'>
                <div className=' alert-container mt-1'>

                    <Transition
                        in={alertState.isShowAlert}
                        timeout={{
                            enter: 700,
                            exit: 400
                        }}
                        mountOnEnter
                        unmountOnExit
                    >{
                        state => (<div className={`animation-container ${state}`}>
                            <Alert alert={alertState} hide={() => dispatch(hideAlert())}/>
                        </div>)
                    }
                    </Transition>
                </div>

                <div className='row justify-content-center mt-1'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit regions</div>


                        <ComboBoxGroupFullState
                            name='selectedCountry'
                            value={state.selectedCountryId}
                            placeholder={'Select country'}
                            items={countries}
                            label={'Select country'}
                            onChange={handleSelectCountry}/>

                        <ListBox
                            inputAttributes={{
                                name: 'selectedRegion',
                                onChange: handleSelectRegion,
                                multiple: true,
                            }}
                            items={state.filteredRegions}
                            height={300}
                            label={'Regions'}
                        />

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup
                                    inputAttributes={{
                                        name: 'region',
                                        type: 'text',
                                        value: state.region,
                                        // placeholder: 'search grape...',
                                        onChange: handleInputChange
                                    }}
                                    labelWidth={100}
                                    label={'Region'}
                                />
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