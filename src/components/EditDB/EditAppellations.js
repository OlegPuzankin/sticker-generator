import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";


const INITIAL_STATE = {

    //country: '',
    //countryId: '',
    selectedCountry: '',
    selectedRegion: '',

    appellation: '',
    selectedAppellation: '',
    refreshTrigger: true,


};


export const EditAppellations = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const countriesRef = firebase.db.collection('countries');
        const regionsRef = firebase.db.collection('regions');
        const appellationsRef = firebase.db.collection('appellations');

        const [values, setValues] = React.useState(INITIAL_STATE);
        const [countries, setCountries] = React.useState([]);
        const [regions, setRegions] = React.useState([]);
        const [appellations, setAppellations] = React.useState([]);
        const [filteredRegions, setFilteredRegions] = React.useState([]);
        const [filteredAppellations, setFilteredAppellations] = React.useState([]);


        // const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
        //     useFormValidation(INITIAL_STATE, validateEditDB);

        //////////////////////////////////FUNCTIONS////////////////////////////

        function getAppellationRefByName(name) {

            return appellationsRef
                .where('name', '==', name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        return querySnapshot.docs[0].ref
                    }
                })
        }

        function changeHandler(e) {
            setValues({
                ...values,
                [e.target.name]: e.target.value
            })
        }

        function getCountriesName() {
            return countries.map(g => g.name);
        }

        function getRegionsName() {
            return filteredRegions.map(r => r.name);
        }

        function getAppellationsName() {
            return filteredAppellations.map(r => r.name);
        }


        //////////////////////////////////ADD APPELLATION/////////////////////////////////
        async function handleAddAppellation() {
            //const regionRef = await getRegionByName(values.editCountry)

            appellationsRef.add({name: values.appellation, region: values.selectedRegion})

                .then(() => {

                    setValues({
                        ...values,
                        appellation: '',
                        refreshTrigger: !values.refreshTrigger
                    })

                })
                .catch(error => {
                    console.log(error.message)
                })
        }

        //////////////////////////////////UPDATE APPELLATION/////////////////////////////////
        async function handleUpdateAppellation() {
            debugger

            const appellationRef = await getAppellationRefByName(values.selectedAppellation);
            appellationRef.update({name: values.appellation})
                .then(() => {
                    debugger
                    setValues({
                        ...values,
                        appellation: '',
                        refreshTrigger: !values.refreshTrigger
                    });

                })
                .catch(error => {
                    debugger
                    console.log(error.message)
                })

        }

//////////////////////////////////HANDLE DELETE APPELLATION/////////////////////////////////
        async function handleDeleteAppellation() {

            const appellationRef = await getAppellationRefByName(values.selectedAppellation);

            appellationRef.delete()
                .then(() => {

                    setValues({
                        ...values,
                        appellation: '',
                        refreshTrigger: !values.refreshTrigger
                    })

                })
                .catch(error => {
                    console.log(error.message)
                })
        }

/////////////////////////////////LOAD AND SYNC DATA///////////////////////
        React.useEffect(() => {
            countriesRef
                .orderBy('name')
                .onSnapshot(snapshot => {
                    const countries = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setCountries(countries);
                });

            regionsRef
                .orderBy('name')
                .onSnapshot(snapshot => {

                    const regions = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setRegions(regions);

                })

            appellationsRef
                .orderBy('name')
                .onSnapshot(snapshot => {

                    const appellations = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setAppellations(appellations);
                })
        }, []);

///////////////////////////////HANDLE SELECT REGION FROM LIST EFFECT//////////////////

        React.useEffect(() => {
            if (regions) {
                const selectedRegion = regions.filter(r => r.name === values.selectedRegion);
                debugger
                if (selectedRegion.length > 0) {

                    const result = appellations.filter(a => a.region === selectedRegion[0].name);

                    setFilteredAppellations(result);
                    //setValues({...INITIAL_STATE, selectedRegion: selectedRegion[0].name})

                } else {
                    setValues(INITIAL_STATE)
                    setFilteredAppellations([])
                }
            }

        }, [values.selectedRegion]);

        ///////////////////////////////HANDLE SELECT APPELLATION FROM LIST EFFECT//////////////////

        React.useEffect(() => {

            setValues({...values, appellation: values.selectedAppellation});

        }, [values.selectedAppellation]);


        /////////////////////////////////REFRESH APPELLATIONS LIST AFTER UPDATE AND DELETE////////////////////
        React.useEffect(() => {
            debugger

            if (values.selectedRegion) {
                const result = appellations.filter(a => a.region === values.selectedRegion);
                setFilteredAppellations(result)
            }

        }, [values.refreshTrigger]);

        //////////////////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {

            if (countries) {
                const selectedCountry = countries.filter(c => c.name === values.selectedCountry);
                debugger

                if (selectedCountry.length > 0) {

                    const result = regions.filter(r => r.country === selectedCountry[0].name);

                    setFilteredRegions(result);
                    setValues({...INITIAL_STATE, selectedCountry: selectedCountry[0].name})

                } else {
                    setValues(INITIAL_STATE)
                    setFilteredRegions([])
                }

            }

        }, [values.selectedCountry]);


///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('values', values);
        //console.log('regions', regions);
//         console.log('regionIndex', regionIndex);
        //console.log('countries', countries);


        return (

            <div className='container'>
                <div className='row justify-content-center mt-5'>
                    <div className='col-6'>
                        <div className='text-center h3 mb-3'>Edit appellations</div>

                        <ComboBoxGroup name='selectedCountry'
                                       placeholder={'Select country'}
                                       items={getCountriesName()}
                                       label={'Select country'}
                                       changeHandler={changeHandler}/>

                        <ComboBoxGroup name='selectedRegion'
                                       placeholder={'Select region'}
                                       items={getRegionsName()}
                                       label={'Select region'}
                                       changeHandler={changeHandler}/>

                        <ListBox
                            items={getAppellationsName()}
                            label={'Appellations'}
                            changeHandler={changeHandler}
                            name={'selectedAppellation'}/>

                        <div className='row'>

                            <div className='col-12 mb-2'>
                                <InputGroup name={'appellation'}
                                            type={'text'}
                                            labelWidth={100}
                                            changeHandler={changeHandler}
                                            value={values.appellation}
                                            label={'Appellation'}/>
                            </div>


                            <div className='col'>
                                <button className='btn btn-primary btn-block btn-sm' onClick={handleAddAppellation}>Add
                                    appellation
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-info btn-block btn-sm' onClick={handleUpdateAppellation}>Update
                                </button>
                            </div>

                            <div className='col'>
                                <button className='btn btn-danger btn-block btn-sm' onClick={handleDeleteAppellation}>Delete
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        );
    }
;