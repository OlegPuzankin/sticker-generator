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
import {useDispatch, useSelector} from "react-redux";
import {selectProducers} from "../../redux/selectors/firebase-redux-selectors";
import {SET_PRODUCERS} from "../../redux/types";


const INITIAL_STATE = {

    producer: '',
    producerFullData: '',
    selectedProducerId: '',


};

function reducer(state, action) {
    const {payload} = action;
    switch (action.type) {

        case 'SET_PRODUCERS':
            return {...state, producers: payload};
        case 'SET_SELECTED_PRODUCER':
            const {id, name, producerFullData} = payload;
            //const selectedProducer= state.producers.find(pr=>pr.name===payload);

            return {...state, selectedProducerId: id, producer: name, producerFullData: producerFullData};
        case 'SET_PRODUCER_VALUE':
            return {...state, producer: payload};
        case 'SET_PRODUCER_FULL_DATA':
            return {...state, producerFullData: payload};
        case 'RESET':
            return {...state, selectedProducerId: '', producer: '', producerFullData: ''};


        default:
            return state
    }
}


export const EditProducers2 = () => {


        const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);

        const producers=useSelector(selectProducers);
        const dispatchRedux = useDispatch();

        //////////////////////////////////ADD PRODUCER/////////////////////////////////
        async function handleAddProducer() {
            try {
                await addItemInCollection('producers', {name: state.producer, producerFullData: state.producerFullData});
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
            //const unsubscribe=loadAndSyncCollection('producers', dispatchRedux, SET_PRODUCERS)
            const unsubscribe= loadAndSyncCollection('producers',
                (data)=>dispatchRedux({type:SET_PRODUCERS, payload:data}))

            return ()=>{
                unsubscribe()
            }
        }, []);


///////////////////////////////////////FUNCTIONS//////////////////////////////////////////////

        function handleSelectProducer(e) {
            const selectedProducer = producers.find(p => p.id === e.target.value);
            debugger

            dispatch({type: 'SET_SELECTED_PRODUCER', payload: selectedProducer})
        }

        function handleInputProducer(e) {
            dispatch({type: 'SET_PRODUCER_VALUE', payload: e.target.value})
        }

        function handleInputFullData(e) {
            dispatch({type: 'SET_PRODUCER_FULL_DATA', payload: e.target.value})
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('state', state);
        console.log('producers', producers);


        if (producers.length === 0) {
            return <Loader/>
        }


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-10'>
                        <div className='text-center h3'>Edit producers</div>


                        <div className='d-flex'>
                            <div className='mr-3'>
                                <ListBox
                                    inputAttributes={{
                                        name: 'selectedProducer',
                                        onChange: handleSelectProducer,
                                        multiple: true,
                                    }}
                                    label={'Producers'}
                                    items={producers}
                                    changeHandler={handleSelectProducer}
                                    height={400}
                                    width={250}
                                />

                            </div>

                            <div className='w-100'>
                                <div className='mt-4'>
                                    <InputGroup
                                        inputAttributes={{
                                            name: 'producer',
                                            type: 'text',
                                            value: state.producer,
                                            onChange: handleInputProducer
                                        }}
                                        labelWidth={180}
                                        label={'Producer (short name)'
                                        }/>
                                </div>
                                <div className=''>
                                    <TextArea
                                        label={'Producer detail data'}
                                        changeHandler={handleInputFullData}
                                        value={state.producerFullData}
                                    />
                                </div>
                                <div className='d-flex'>
                                    <div className=' mr-1'>
                                        <button className='btn btn-primary btn-block btn-sm' onClick={handleAddProducer}>Add
                                            producer
                                        </button>
                                    </div>

                                    <div className='mr-1'>
                                        <button disabled={state.selectedProducerId.length === 0}
                                                className='btn btn-info btn-block btn-sm' onClick={handleUpdateProducer}>Update
                                        </button>
                                    </div>

                                    <div >
                                        <button disabled={state.selectedProducerId.length === 0}
                                                className='btn btn-danger btn-block btn-sm' onClick={handleDeleteProducer}>Delete
                                        </button>
                                    </div>

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>

        );
    }
;