import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";


const INITIAL_STATE = {

    grape: '',
    grapeId: '',
    selectedGrape: ''

};


export const EditGrapesV2 = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const grapesRef = firebase.db.collection('grapes');

        const [grapes, setGrapes] = React.useState([]);
        // const [grape, setGrape] = React.useState({});
        // const [selectedGrape, setSelectedGrape] = React.useState('');
        // const [grapeId, setGrapeId] = React.useState(null);


        const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
            useFormValidation(INITIAL_STATE, validateEditDB);


        //////////////////////////////////ADD GRAPE/////////////////////////////////
        async function handleAddGrape() {
            const response = await grapesRef.add({name: values.grape});
            grapesRef.doc(response.id).update({id: response.id});
            setValues(INITIAL_STATE)
        }

        //////////////////////////////////UPDATE GRAPE/////////////////////////////////
        function handleUpdateGrape() {
            grapesRef
                .where('id', '==', values.grapeId)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        return querySnapshot.docs[0].ref.update({name: values.grape})
                    }

                })
                .then(() => {
                    setValues(INITIAL_STATE)
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE GRAPE/////////////////////////////////
        function handleDeleteGrape() {
            grapesRef
                .where('id', '==', values.grapeId)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {

                        return querySnapshot.docs[0].ref.delete()
                    }
                })
                .then(() => {
                    setValues(INITIAL_STATE)
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            grapesRef
                .orderBy('name')
                .onSnapshot(snapshot => {
                    const grapes = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setGrapes(grapes);
                })
        }, []);

///////////////////////////////HANDLE SELECT GRAPE FROM LIST EFFECT//////////////////

        React.useEffect(() => {

            //setValues({...values, grape: values.selectedGrape});

            const result = grapes.filter(g => g.name === values.selectedGrape);
            if (result.length > 0)
                setValues({...values, grapeId: result[0].id, grape: values.selectedGrape})

        }, [values.selectedGrape]);

        function getGrapesName() {
            return grapes.map(g => g.name);
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('values', values);
        //console.log('grapeId', grapeId);
//console.log('grapeRef', grapeRef)


        return (


                <div >

                    <ListBox
                        items={getGrapesName()}
                        label={'Grapes'}
                        changeHandler={changeHandler}
                        name={'selectedGrape'}/>

                    <div className='row'>

                        <div className='col-12'>
                            <InputGroup name={'grape'}
                                        type={'text'}
                                        labelWidth={100}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.grape}
                                        error={errors['grape']}
                                        label={'Grape'}/>
                        </div>


                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleAddGrape}>Add grape</button>
                        </div>

                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleUpdateGrape}>Update</button>
                        </div>

                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleDeleteGrape}>Delete</button>
                        </div>

                    </div>

                </div>
        );
    }
;