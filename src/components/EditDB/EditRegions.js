import React from 'react';
import {ListBox} from "../../UI/ListBox";
import {FirebaseContext} from "../../firebase";
import useFormValidation from "../Auth/useFormValidation";
import validateEditDB from "./validateEditDB";
import {InputGroup} from "../../UI/InputGroup";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";


const INITIAL_STATE = {

    //country: '',
    countryId: '',
    selectedCountry: '',

    region: '',
    regionIndex: '',
    selectedRegion: '',


};


export const EditRegions = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const countriesRef = firebase.db.collection('countries');

        const [countries, setCountries] = React.useState([]);
        const [regions, setRegions] = React.useState([]);
        //const [region, setRegion] = React.useState({});
        const [regionIndex, setRegionIndex] = React.useState(null);
        // const [selectedGrape, setSelectedGrape] = React.useState('');
        // const [grapeId, setGrapeId] = React.useState(null);


        const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
            useFormValidation(INITIAL_STATE, validateEditDB);

        function getCountryById(id) {
            return countriesRef
                .where('id', '==', id)
                .get()
        }


        //////////////////////////////////ADD REGION/////////////////////////////////
        async function handleAddRegion() {
            getCountryById(values.countryId)
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {

                        regions.push({name: values.region, appels: []})
                        debugger
                        querySnapshot.docs[0].ref.update({regions})
                    }

                })
                .then(() => {
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry})
                })
                .catch(error => {
                    console.log(error.message)
                })
            setValues(INITIAL_STATE)
        }

        //////////////////////////////////UPDATE REGION/////////////////////////////////
        function handleUpdateRegion() {
            getCountryById(values.countryId)
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {

                        regions[values.regionIndex].name = values.region;
                        debugger
                        querySnapshot.docs[0].ref.update({regions})
                    }

                })
                .then(() => {
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry})
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE REGION/////////////////////////////////
        function handleDeleteRegion() {
            debugger
            getCountryById(values.countryId)
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {

                        regions.splice(values.regionIndex, 1)
                        debugger
                        querySnapshot.docs[0].ref.update({regions})
                    }

                })
                .then(() => {
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry})
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
                })
        }, []);

///////////////////////////////HANDLE SELECT REGION FROM LIST EFFECT//////////////////

        React.useEffect(() => {

            //setValues({...values, grape: values.selectedGrape});

            //const result = regions.filter(r => r.name === values.selectedRegion);
            //let selReg;
            //let regIndex;
            regions.forEach((r, i) => {
                if (r.name === values.selectedRegion) {
                    //selReg=r;
                    //debugger
                    setValues({...values, regionIndex: i, region: values.selectedRegion});
                }

            })
            //debugger
            // if (result.length > 0)
            //     setValues({...values, region: values.selectedRegion})

        }, [values.selectedRegion]);

        ///////////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {
            //debugger
            if (countries) {
                const selectedCountry = countries.filter(c => {
                    //debugger
                    return c.name === values.selectedCountry
                });

                //debugger

                if (selectedCountry.length > 0) {
                    const regions = selectedCountry[0].regions;

                    setRegions(regions)
                    setValues({...values, countryId: selectedCountry[0].id})

                } else
                    setRegions([])
            }

        }, [values.selectedCountry]);

        function getCountriesName() {
            return countries.map(g => g.name);
        }

        function getRegionsName() {
            return regions.map(r => r.name);
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('values', values);
        console.log('regions', regions);
        console.log('regionIndex', regionIndex);
        console.log('countries', countries);
//console.log('grapeRef', grapeRef)


        return (

                <div >

                    <ComboBoxGroup name='selectedCountry'
                                   placeholder={'Select country'}
                                   error={errors['country']}
                                   items={getCountriesName()}
                                   label={'Select country'}
                                   changeHandler={changeHandler}
                                   handleBlur={handleBlur}/>

                    <ListBox
                        items={getRegionsName()}
                        label={'Regions'}
                        changeHandler={changeHandler}
                        name={'selectedRegion'}/>

                    <div className='row'>

                        <div className='col-12'>
                            <InputGroup name={'region'}
                                        type={'text'}
                                        labelWidth={100}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.region}
                                        error={errors['region']}
                                        label={'Region'}/>
                        </div>


                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleAddRegion}>Add region
                            </button>
                        </div>

                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleUpdateRegion}>Update
                            </button>
                        </div>

                        <div className='col'>
                            <button className='btn btn-primary btn-block btn-sm' onClick={handleDeleteRegion}>Delete
                            </button>
                        </div>

                    </div>

                </div>

        );
    }
;