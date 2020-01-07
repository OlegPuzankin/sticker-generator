import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {InputGroup} from "../../UI/InputGroup";
import {
    addItemInCollection,
    getItemCollectionById,
    loadAndSyncCollection
} from "../../firebase/firebaseFunctions";
import {Loader} from "../../UI/Loader";
import {TextArea} from "../../UI/TextArea";


const INITIAL_STATE = {

    producer: '',
    producerFullData: '',
    selectedProducerId: '',
    producers: []

};

function reducer(state, action) {
    const {payload}=action;
    switch (action.type) {

        case 'SET_PRODUCERS':
            return {...state, producers:payload};
        case 'SET_SELECTED_PRODUCER':
            const {id,name, producerFullData }=payload;
            //const selectedProducer= state.producers.find(pr=>pr.name===payload);

            return {...state, selectedProducerId: id, producer: name, producerFullData: producerFullData};
        case 'SET_PRODUCER_VALUE':
            return {...state, producer: payload};
        case 'SET_PRODUCER_FULL_DATA':
            return {...state, producerFullData: payload};
        case 'RESET':
            return {...state, selectedProducerId: '', producer: '', producerFullData:''};


        default:
            return state
    }
}


export const EditProducers = () => {


        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

        //////////////////////////////////ADD PRODUCER/////////////////////////////////
        async function handleAddProducer() {
            try {
                await addItemInCollection('producers', {name: state.producer, producerFullData:state.producerFullData});
                //await producersRef.add({name: state.producer});
                dispatch({type: 'RESET'})
            } catch (e) {
                console.log(e.message)
            }
        }

        //////////////////////////////////UPDATE PRODUCER/////////////////////////////////
        async function handleUpdateProducer() {
            const producerRef = await getItemCollectionById('producers', state.selectedProducerId);

            producerRef.update({name: state.producer, producerFullData: state.producerFullData})
                .then(() => {
                    dispatch({type: 'RESET'})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE PRODUCER/////////////////////////////////
        async function handleDeleteProducer() {

            const producerRef = await getItemCollectionById('producers', state.selectedProducerId);
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

        function handleSelectProducer(e) {
            const selectedProducer = state.producers.find(p=>p.id===e.target.value);
            debugger

            dispatch({type: 'SET_SELECTED_PRODUCER', payload:selectedProducer})
        }

        function handleInputProducer(e) {
            dispatch({type: 'SET_PRODUCER_VALUE', payload: e.target.value})
        }

        function handleInputFullData(e) {
            dispatch({type: 'SET_PRODUCER_FULL_DATA', payload: e.target.value})
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
                            items={state.producers}
                            // label={'Countries'}
                            changeHandler={handleSelectProducer}
                            height={200}
                            name={'selectedProducer'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'producer'}
                                            type={'text'}
                                            labelWidth={180}
                                            changeHandler={handleInputProducer}
                                            value={state.producer}
                                            label={'Producer (short name)'}/>
                            </div>

                            <div className='col-12 mb-2'>
                                <TextArea
                                    label={'Producer detail data'}
                                    changeHandler={handleInputFullData}
                                    value={state.producerFullData}
                                />

                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddProducer}>Add
                                    producer
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedProducerId.length===0} className='btn btn-info btn-block btn-sm' onClick={handleUpdateProducer}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button disabled={state.selectedProducerId.length===0} className='btn btn-danger btn-block btn-sm' onClick={handleDeleteProducer}>Delete
                                </button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;