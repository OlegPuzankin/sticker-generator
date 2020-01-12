import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {Loader} from "../../UI/Loader";
import {
    addItemInCollection,
    getItemCollectionById,
    loadAndSyncCollection
} from "../../firebase/firebaseFunctions";
import {Transition} from "react-transition-group";
import {Alert} from "../../UI/Alert";
import {hideAlert, showAlert} from "../../redux/actions/alertActions";
import {useDispatch, useSelector} from "react-redux";
import {selectCountries, selectRegions} from "../../redux/selectors/firebase-redux-selectors";
import {SET_COUNTRIES} from "../../redux/types";


const INITIAL_STATE = {

    country: '',
    selectedCountryId: '',

};

function reducer(state, action) {
    const {payload} = action;
    switch (action.type) {


        case 'SET_SELECTED_COUNTRY':
            const {id, name} = payload;
            return {...state, selectedCountryId: id, country: name};
        case 'SET_COUNTRY_VALUE':
            return {...state, country: payload};
        case 'RESET':
            return {...state, country: '', selectedCountryId: ''};


        default:
            return state
    }
}


export const EditCountries = () => {

        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

        const regions = useSelector(selectRegions);
        const countries = useSelector(selectCountries);

        const alertState = useSelector(state => state.alert);
        const dispatchRedux = useDispatch();

        //////////////////////////////////ADD COUNTRY/////////////////////////////////
        async function handleAddCountry() {
            try {
                await addItemInCollection('countries', {name: state.country});
                dispatch({type: 'RESET'})
            } catch (e) {
                alert(e.message)
            }

        }

        //////////////////////////////////UPDATE COUNTRY/////////////////////////////////
        async function handleUpdateCountry() {

            const countryRef = await getItemCollectionById('countries', state.selectedCountryId);

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

            const hasCountryRegions = !!regions.find(r => r.countryId === state.selectedCountryId);
            if (hasCountryRegions) {
                dispatchRedux(showAlert('Country can not be deleted because has regions ', 'danger'));
                setTimeout(() => {
                    dispatchRedux(hideAlert());
                }, 4500);
            } else {
                const countryRef = await getItemCollectionById('countries', state.selectedCountryId);
                countryRef.delete()
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
            const unsubscribe =loadAndSyncCollection('countries',
                (data)=>dispatchRedux({type:SET_COUNTRIES, payload:data}));

            return ()=>{
                unsubscribe()
            }

        }, []);

///////////////////////////////////////FUNCTIONS//////////////////////////////////////////////
        function handleSelectCountry(e) {
            const selectedCountryId = e.target.value;
            const selectedCountry = countries.find(c => c.id === selectedCountryId);
            if (selectedCountry)
                dispatch({type: 'SET_SELECTED_COUNTRY', payload: selectedCountry})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_COUNTRY_VALUE', payload: e.target.value})
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);
        console.log('regions', regions);

        if (countries.length === 0) {
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
                        <div className='text-center h3 mb-1'>Edit countries</div>

                        <ListBox
                            inputAttributes={{
                                name: 'selectedCountry',
                                onChange: handleSelectCountry,
                                multiple: true,
                            }}
                            items={countries}
                            height={250}
                        />

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup
                                    inputAttributes={{
                                        name: 'country',
                                        type: 'text',
                                        value: state.country,
                                        // placeholder: 'search grape...',
                                        onChange: handleInputChange
                                    }}
                                    labelWidth={100}
                                    label={'Country'}
                                />
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddCountry}>Add
                                    country
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedCountryId.length === 0}
                                        className='btn btn-info btn-block btn-sm' onClick={handleUpdateCountry}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedCountryId.length === 0}
                                        className='btn btn-danger btn-block btn-sm' onClick={handleDeleteCountry}>Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;

