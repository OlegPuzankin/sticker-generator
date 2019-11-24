import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";


// const INITIAL_STATE = {
//
//     // grapes: [],
//     grape: '',
//     selectedGrape: ''
//
// };


export const EditGrapes = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const grapesRef = firebase.db.collection('grapes');

        const [grapes, setGrapes] = React.useState([]);
        const [grape, setGrape] = React.useState({});
        const [selectedGrape, setSelectedGrape] = React.useState('');
        const [grapeId, setGrapeId] = React.useState(null);


        // const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
        //     useFormValidation(INITIAL_STATE);


        //////////////////////////////////ADD GRAPE/////////////////////////////////
        async function handleAddGrape() {
            // let id;
            // await firebase.db.collection('grapes').get().then(snapshot => {
            //     id = snapshot.docs.length + 1
            //     debugger
            // })
            debugger
            const response = await firebase.db.collection('grapes').add({name: grape});
            debugger
            grapesRef.doc(response.id).update({id: response.id});
            setGrape('');
            setGrapeId(null)

        }

        //////////////////////////////////UPDATE GRAPE/////////////////////////////////
        function handleUpdateGrape() {

            debugger

            grapesRef
                .where('id', '==', grapeId)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        debugger
                        return querySnapshot.docs[0].ref.update({name: grape})
                    }

                })
                .then(() => {
                    setGrape('');
                    setGrapeId(null)
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE GRAPE/////////////////////////////////
        function handleDeleteGrape() {
            grapesRef
                .where('id', '==', grapeId)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        debugger
                        return querySnapshot.docs[0].ref.delete()
                    }

                })
                .then(() => {
                    setGrape('');
                    setGrapeId(null)
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

            setGrape(selectedGrape);
            const result = grapes.filter(g => g.name === selectedGrape);
            debugger
            if (result.length > 0)
                setGrapeId(result[0].id)

        }, [selectedGrape]);

        function getGrapesName() {
            return grapes.map(g => g.name);
            debugger
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        //console.log('values', values);
        //console.log('grapeId', grapeId);
//console.log('grapeRef', grapeRef)


        return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>

                        <ListBox
                            items={getGrapesName()}
                            label={'Grapes'}
                            changeHandler={e => setSelectedGrape(e.target.value)}
                            name={'selectedGrape'}/>

                        <div className='row'>

                            <div className='col-9'>
                                <input type='text'
                                       name={'grape'}
                                       value={grape}
                                       className='form-control'
                                       onChange={e => setGrape(e.target.value)}
                                       placeholder={'Enter grape'}/>
                            </div>

                            <div className='col-1'>
                                <button className='btn btn-primary btn-sm' onClick={handleAddGrape}>Add grape</button>
                            </div>

                            <div className='col-1'>
                                <button className='btn btn-primary btn-sm' onClick={handleUpdateGrape}>Update</button>
                            </div>

                            <div className='col-1'>
                                <button className='btn btn-primary btn-sm' onClick={handleDeleteGrape}>Delete</button>
                            </div>

                        </div>

                    </div>


                </div>

            </div>
        );
    }
;