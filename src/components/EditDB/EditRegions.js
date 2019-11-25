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

    region: '',
    refreshTrigger: true,
    selectedRegion: '',


};


export const EditRegions = () => {

        const {firebase} = React.useContext(FirebaseContext);
        const countriesRef = firebase.db.collection('countries');
        const regionsRef = firebase.db.collection('regions');

        const [countries, setCountries] = React.useState([]);
        const [regions, setRegions] = React.useState([]);
        const [filteredRegions, setFilteredRegions] = React.useState([]);

        const {changeHandler, handleBlur, values, setValues, errors, isSubmitting} =
            useFormValidation(INITIAL_STATE, validateEditDB);

        //////////////////////////////////FUNCTIONS////////////////////////////

        function getRegionRefByName(name) {
        debugger
            return regionsRef
                .where('name', '==', name)
                .get()
                .then(querySnapshot => {
                    if (querySnapshot.docs.length > 0) {
                        return querySnapshot.docs[0].ref
                    }
                })
        }



        //////////////////////////////////ADD REGION/////////////////////////////////
        async function handleAddRegion() {
            //const regionRef = await getRegionByName(values.editCountry)

            regionsRef.add({name: values.region, country: values.selectedCountry})

                .then(() => {
                debugger
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry, refreshTrigger: !values.refreshTrigger})

                })
                .catch(error => {
                debugger
                    console.log(error.message)
                })

        }


        //////////////////////////////////UPDATE REGION/////////////////////////////////
        async function handleUpdateRegion() {

            const regionRef = await getRegionRefByName(values.selectedRegion);
        debugger

            regionRef.update({name: values.region})
                .then(() => {
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry,  refreshTrigger:!values.refreshTrigger});
                })
                .catch(error => {
                    console.log(error.message)
                })

        }

//////////////////////////////////DELETE REGION/////////////////////////////////
        async function handleDeleteRegion() {
        debugger
            const regionRef = await getRegionRefByName(values.selectedRegion);

            regionRef.delete()
                .then(() => {
                    debugger
                    setValues({...INITIAL_STATE, selectedCountry: values.selectedCountry,  refreshTrigger:!values.refreshTrigger})

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
                    //debugger
                    const countries = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setCountries(countries);
                });

            regionsRef
                .orderBy('name')
                .onSnapshot(snapshot => {
                    debugger
                    const regions = snapshot.docs.map(doc => {
                        return doc.data()
                    });
                    setRegions(regions);

                })


        }, []);

///////////////////////////////HANDLE SELECT REGION FROM LIST EFFECT//////////////////

        React.useEffect(() => {

            setValues({...values, region: values.selectedRegion});

        }, [values.selectedRegion]);

/////////////////////////////////////////REFRESH REGIONS LIST AFTER UPDATE AND DELETE///////////////////////////////
        React.useEffect(() => {
            debugger

            if(values.selectedCountry){
                const result=regions.filter(r => r.country === values.selectedCountry);
                setFilteredRegions(result)
            }

        }, [values.refreshTrigger]);

        ///////////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {
            debugger
            if (countries) {
                const selectedCountry = countries.filter(c => c.name === values.selectedCountry);
                //debugger
                if (selectedCountry.length > 0) {

                    const result = regions.filter(r => r.country === selectedCountry[0].name);

                    setFilteredRegions(result);
                    setValues({...INITIAL_STATE, selectedCountry: selectedCountry[0].name})

                } else
                    setRegions([])
            }

        }, [values.selectedCountry]);

        function getCountriesName() {
            return countries.map(g => g.name);
        }

        function getRegionsName() {
            return filteredRegions.map(r => r.name);
        }

///////////////////////////////////////////////////RENDER//////////////////////////////////////////////////
        console.log('values', values);
        //console.log('regions', regions);
//         console.log('regionIndex', regionIndex);
        //console.log('countries', countries);


        return (

            <div>

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