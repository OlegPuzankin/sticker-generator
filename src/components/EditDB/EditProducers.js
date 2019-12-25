import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import {InputGroup} from "../../UI/InputGroup";
import {addItemInCollection, getItemCollectionByName, loadAndSyncCollection} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";


const INITIAL_STATE = {

    producer: '',
    selectedProducer: '',
    producers: []

};

function reducer(state, action) {
    switch (action.type) {

        case 'SET_PRODUCERS':
            return {...state, producers: action.payload}
        case 'SET_SELECTED_PRODUCER':
            return {...state, selectedProducer: action.payload, producer: action.payload}
        case 'SET_PRODUCER_VALUE':
            return {...state, producer: action.payload}
        case 'RESET':
            return {...state, selectedProducer: '', producer: ''}


        default:
            return state
    }
}


export const EditProducers = () => {


        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE)

        //////////////////////////////////ADD PRODUCER/////////////////////////////////
        async function handleAddProducer() {
            try {
                await addItemInCollection('producers', {name: state.producer})
                //await producersRef.add({name: state.producer});
                dispatch({type: 'RESET'})
            } catch (e) {
                console.log(e.message)
            }
        }

        //////////////////////////////////UPDATE PRODUCER/////////////////////////////////
        async function handleUpdateProducer() {
            const producerRef = await getItemCollectionByName('producers', state.selectedProducer)

            producerRef.update({name: state.producer})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE PRODUCER/////////////////////////////////
        async function handleDeleteProducer() {

            const producerRef = await getItemCollectionByName('producers', state.selectedProducer)
            producerRef.delete()
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            loadAndSyncCollection('producers', dispatch, 'SET_PRODUCERS')
        }, []);


///////////////////////////////////////FUNCTIONS//////////////////////////////////////////////
        function getProducersName() {
            return state.producers.map(p => p.name);
        }

        function handleSelectProducer(e) {
            dispatch({type: 'SET_SELECTED_PRODUCER', payload: e.target.value})
        }

        function handleInputChange(e) {
            dispatch({type: 'SET_PRODUCER_VALUE', payload: e.target.value})
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);


        if (state.producers.length === 0) {
            return <Loader/>
        }


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-1'>Edit producers</div>

                        <ListBox
                            items={getProducersName()}
                            // label={'Countries'}
                            changeHandler={handleSelectProducer}
                            name={'selectedProducer'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'country'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={handleInputChange}
                                            value={state.producer}
                                            label={'Producer'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddProducer}>Add
                                    producer
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedProducer.length===0} className='btn btn-info btn-block btn-sm' onClick={handleUpdateProducer}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedProducer.length===0} className='btn btn-danger btn-block btn-sm' onClick={handleDeleteProducer}>Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;