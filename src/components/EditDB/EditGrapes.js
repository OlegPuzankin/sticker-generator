import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {
    addItemInCollection,
    getItemCollectionById,
    loadAndSyncCollection
} from "../../firebase/firebaseFunctions";
import {useDispatch, useSelector} from "react-redux";
import {selectGrapes} from "../../redux/selectors/firebase-redux-selectors";
import {SET_GRAPES} from "../../redux/types";


const INITIAL_STATE = {

    grape: '',
    selectedGrapeId: '',
    filteredGrapes: [],

    queryString: ''

};

function reducer(state, action) {
    const {payload}=action
    switch (action.type) {


        case 'SET_SELECTED_GRAPE':
            const {id, name} = payload;
            return {...state, selectedGrapeId: id, grape: name};
        case 'SET_GRAPE_VALUE':
            return {...state, grape: payload};
        case 'SET_SEARCH_QUERY':
            return {...state, queryString: payload};
        case 'SET_FILTERED_GRAPES':
            return {...state, filteredGrapes: payload};
        case 'RESET':
            return {...state, grape: '', selectedGrapeId: '', queryString: ''};


        default:
            return state
    }
}


export const EditGrapes = () => {
        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

        const grapes=useSelector(selectGrapes);
        const dispatchRedux = useDispatch();



        //////////////////////////////////ADD GRAPE/////////////////////////////////
        async function handleAddGrape() {
            debugger
            try {
                await addItemInCollection('grapes', {name: state.grape});
                //await producersRef.add({name: state.producer});
                dispatch({type: 'RESET'})
            } catch (e) {
                console.log(e.message)
            }
        }

        //////////////////////////////////UPDATE GRAPE/////////////////////////////////
        async function handleUpdateGrape() {
            const grapeRef = await getItemCollectionById('grapes', state.selectedGrapeId);

            grapeRef.update({name: state.grape})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE GRAPE/////////////////////////////////
        async function handleDeleteGrape() {
            const grapeRef = await getItemCollectionById('grapes', state.selectedGrapeId);
            grapeRef.delete()
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            const unsubscribe=loadAndSyncCollection('grapes',
                (data)=>dispatchRedux({type:SET_GRAPES, payload:data}));

            return ()=>{
                unsubscribe()}
        }, []);

        ///////////////////////////////////////FUNCTIONS///////////////////////////

        function handleSelectGrape(e) {
            const selectedGrape = grapes.find(g=>g.id===e.target.value)
            dispatch({type: 'SET_SELECTED_GRAPE', payload: selectedGrape})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_GRAPE_VALUE', payload: e.target.value})
        }

        function handleSearchInput(e) {
            const query = e.target.value;
            dispatch({type: 'SET_SEARCH_QUERY', payload: query});
        }

        React.useEffect(() => {
            const matchedGrapes = grapes.filter(grape => {
                return grape.name.toLowerCase().includes(state.queryString.toLowerCase())

            });
            dispatch({type: 'SET_FILTERED_GRAPES', payload: matchedGrapes});

        }, [state.queryString, grapes])

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>

                        <div className='text-center h3 mb-3'>Edit grapes</div>

                        <InputGroup
                            inputAttributes={{
                                name: 'search',
                                type: 'search',
                                value: state.queryString,
                                placeholder: 'search grape...',
                                onChange: handleSearchInput
                            }}
                            labelWidth={80}
                            label={'Search'}
                        />

                        <ListBox
                            inputAttributes={{
                                name: 'selectedGrape',
                                onChange: handleSelectGrape,
                                multiple: true,
                            }}
                            items={state.filteredGrapes}
                            height={350}
                        />

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup
                                    inputAttributes={{
                                        name: 'grape',
                                        type: 'text',
                                        value: state.grape,
                                        // placeholder: 'search grape...',
                                        onChange: handleInputChange
                                    }}
                                    labelWidth={100}
                                    label={'Grape'}
                                />
                            </div>


                            <div className='col'>
                                <button
                                    className='btn btn-primary btn-block btn-sm'
                                    onClick={handleAddGrape}>
                                    Add grape
                                </button>
                            </div>

                            <div className='col'>
                                <button
                                    disabled={state.selectedGrapeId.length===0}
                                    className='btn btn-info btn-block btn-sm'
                                    onClick={handleUpdateGrape}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button
                                    disabled={state.selectedGrapeId.length===0}
                                    className='btn btn-danger btn-block btn-sm'
                                    onClick={handleDeleteGrape}>Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
;

//todo useReducer pattern here