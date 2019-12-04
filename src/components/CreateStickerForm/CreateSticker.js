import React from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateCreateStickerForm from "./validateCreateStickerForm";
import {ListBox} from "../../UI/ListBox";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {InputGroup} from "../../UI/InputGroup";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "../../UI/Alert";
import {hideAlert, showAlert} from "../../redux/actions/alertActions";

import {Loader} from "../../UI/Loader";
import {addItemInCollection, loadCollection} from "../../firebase/firebaseFunctions";
import {
    getAppellationsName,
    getCountriesName,
    getGrapesName, getHarvestYearsName,
    getProducersName,
    getRegionsName
} from "../../functions/utils";


const INITIAL_STATE = {
    producer: '',
    originalTitle: 'Some title',
    country: '',
    region: '',
    appellation: '',
    volume: 750,
    alcohol: 12,
    sugar: 4,
    servingTemperature: 12,
    shelfLifetime: 12,
    lotNumber: 'вказано на пляшці',
    regionControl: '',

    currentGrape: '',
    harvestYear: '2002',
    bottlingYear: '2011-11',

    harvestYears: [],

    grapes: [],
    selectedGrapes: [],
    filteredGrapes: [],
    queryString: '',

    countries: [],
    regions: [],
    appellations: [],
    producers: [],


    filteredRegions: [],
    filteredAppellations: []

};


const regionControlTypes = ['None', 'PDO', 'PJI'];

export const CreateSticker = (props) => {

        //const [alertState, dispatch] = React.useReducer(alertReducer, alertInitialState);

        const alertState = useSelector(state => state.alert);
        const dispatch = useDispatch();
        let editState;


        const {changeHandler, submitHandler, handleBlur, setValues, values, errors, isSubmitting} =
            useFormValidation(INITIAL_STATE, validateCreateStickerForm, saveSticker);


////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////

        // async function loadCollections() {
        //     const countries = await loadCollection('countries');
        //     const regions = await loadCollection('regions');
        //     const appellations = await loadCollection('appellations');
        //     const producers = await loadCollection('producers');
        //     const grapes = await loadCollection('grapes');
        //     const harvestYears = await loadCollection('harvest');
        //
        //     setValues({...values, countries, regions, appellations, producers, grapes, harvestYears});
        // }

        async function saveSticker() {


            const sticker = {
                originalTitle: values.originalTitle,
                producer: values.producer,
                country: values.country,
                region: values.region,
                appellation: values.appellation,
                volume: values.volume,
                alcohol: values.alcohol,
                sugar: values.sugar,
                servingTemperature: values.servingTemperature,
                shelfLifetime: values.shelfLifetime,
                lotNumber: values.lotNumber,
                regionControl: values.regionControl,
                harvestYear: values.harvestYear,
                bottlingYear: values.bottlingYear,

                selectedGrapes: values.selectedGrapes,
            };


            await addItemInCollection('stickers', sticker);


            dispatch(showAlert('Sticker was created', 'primary'));
            setTimeout(() => {
                dispatch(hideAlert());
                setValues({
                    ...values,
                    originalTitle: '',
                    selectedGrapes: [],
                    producer: '',
                    country: '',
                    region: '',
                    appellation: '',
                    regionControl: '',
                    filteredGrapes: values.grapes
                });
            }, 2000);


        }

        function handleSearchInput(e) {
            setValues({...values, queryString: e.target.value})
        }


        function resetGrapes(e) {

            e.preventDefault();

            setValues({...values, filteredGrapes: values.grapes, selectedGrapes: []})

        }

        ///////////////////////////////////////LOAD DATA FROM FIREBASE EFFECT//////////////////////////////////////////

        React.useEffect(() => {

            async function loadCollections() {
                const countries = await loadCollection('countries');
                const regions = await loadCollection('regions');
                const appellations = await loadCollection('appellations');
                const producers = await loadCollection('producers');
                const grapes = await loadCollection('grapes');
                const harvestYears = await loadCollection('harvest');

                setValues({...values, countries, regions, appellations, producers, grapes, harvestYears});
            }

            loadCollections()

        }, [loadCollection]);


///////////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {
            console.log('select country effect')
            if (values.countries.length > 0) {

                let filteredRegions = values.regions.filter(r => r.country === values.country);

                if (filteredRegions.length > 0) {

                    setValues({...values, filteredRegions, filteredAppellations: []});

                    //console.log('values', values)
                    //setValues({...values, filteredAppellations: []});
                } else
                    setValues({...values, filteredRegions: []});
            }
        }, [values.country]);


        /////////////////////////SELECT REGION EFFECT////////////////////////////////////////
        React.useEffect(() => {
            //
            if (values.regions.length > 0) {

                let filteredAppellations = values.appellations.filter(a => a.region === values.region);

                if (filteredAppellations.length > 0) {

                    setValues({...values, filteredAppellations});

                    //console.log('values', values)
                    //setValues({...values, filteredAppellations: []});
                }
                //else
                //     setValues({...values, filteredRegions:[]});
            }
        }, [values.region]);

/////////////////////////////Search effect///////////////////////////////////
        React.useEffect(() => {

            const query = values.queryString.toLowerCase();
            const filteredGrapes = values.grapes.filter(grape => {
                return (
                    grape.name.toLowerCase().includes(query)
                )
            });

            setValues({...values, filteredGrapes})

        }, [values.queryString, values.grapes]);

        /////////////////////////////Alert effect///////////////////////////////////

        React.useEffect(() => {

            console.log('use effect alert body')


            if (!(Object.keys(errors).length === 0)) {
                console.log('use effect show')
                dispatch(showAlert('Please check all fields', 'danger'))
            } else {
                //console.log('use effect hide')
                //dispatch(hideError())
            }

        }, [errors]);

        // if (!(Object.keys(errors).length === 0))
        //     dispatch(showAlert('Please check all fields', 'danger'))

        //////////////////////////select grape effect///////////////////////////

        React.useEffect(() => {

            if (values.currentGrape !== '') {
                const filteredGrapes = values.filteredGrapes.filter(grape => grape.name !== values.currentGrape);

                setValues({
                    ...values,
                    selectedGrapes: [...values.selectedGrapes, values.currentGrape],
                    filteredGrapes,
                    queryString: '',
                })
            }
        }, [values.currentGrape]);




        console.log('values', values);
        //console.log('values', values);

        if (values.countries.length === 0 && values.regions.length === 0 && values.appellations.length === 0) {
            return <Loader/>
        }


        return (
            <>


                <form className='container mt-2' onSubmit={submitHandler}>
                    {alertState.isShowAlert &&
                    <Alert alert={alertState} hide={() => dispatch(hideAlert())}/>
                    }

                    {/*///////////////////TITLE ///////////////////////////////*/}
                    <div className='row justify-content-start'>

                        <div className='col-8 mb-2'>

                            <InputGroup name={'originalTitle'}
                                        value={values.originalTitle}
                                        label={'Title'}
                                        type={'text'}
                                        placeholder={'Enter title'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        error={errors['originalTitle']}/>
                        </div>

                        <div className='col '>
                            {/*////////////////////////NEXT BTN///////////////////////////*/}
                            <button onSubmit={submitHandler} className='btn btn-primary mr-1'>Done</button>

                        </div>


                    </div>
                    {/*///////////////////2_ROW///////////////////////////////*/}
                    <div className='row align-items-start'>
                        {/*///////////////////1 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Basic parameters</div>

                            <InputGroup name={'volume'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.volume}
                                        error={errors['volume']}
                                        label={'Volume,ml'}/>


                            <InputGroup name={'alcohol'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                        value={values.alcohol}
                                        error={errors['alcohol']}
                                        label={'Alcohol %'}/>

                            <InputGroup name={'sugar'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.sugar}
                                        error={errors['sugar']}
                                        label={'Sugar ml '}/>

                            <InputGroup name={'shelfLifetime'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.shelfLifetime}
                                        error={errors['shelfLifetime']}
                                        label={'Shelf lifetime'}/>

                            <InputGroup name={'servingTemperature'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                                        value={values.servingTemperature}
                                        error={errors['servingTemperature']}
                                        label={'Serving temp C'}/>


                            <ComboBoxGroup name='harvestYear'
                                           placeholder={'Select harvest year'}
                                           error={errors['harvestYear']}
                                           items={getHarvestYearsName(values.harvestYears)}
                                           value={values.harvestYear}
                                           label={'Harvest year'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />


                            <InputGroup name={'bottlingYear'}
                                        type={'month'}
                                        value={values.bottlingYear}
                                        error={errors['bottlingYear']}
                                        label={'Bottling year'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <InputGroup name={'lotNumber'}
                                        type={'text'}
                                        value={values.lotNumber}
                                        error={errors['lotNumber']}
                                        label={'Lot number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />


                        </div>
                        {/*///////////////////2 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Region parameters</div>

                            <ComboBoxGroup name='producer'
                                           placeholder={'Select producer'}
                                           error={errors['producer']}
                                           value={values.producer}
                                           items={getProducersName(values.producers)}
                                           label={'Select producer'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='regionControl'
                                           value={values.regionControl}
                                           placeholder={'Select control type'}
                                           error={errors['regionControl']}
                                           items={regionControlTypes}
                                           label={'Origin control'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />
                            <ComboBoxGroup name='country'
                                           value={values.country}
                                           placeholder={'Select country'}
                                           error={errors['country']}
                                           items={getCountriesName(values.countries)}
                                           label={'Select country'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='region'
                                           placeholder={'Select region'}
                                           value={values.region}
                                           error={errors['region']}
                                           items={getRegionsName(values.filteredRegions)}
                                           label={'Select region'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='appellation'
                                           placeholder={'Select appellation'}
                                           value={values.appellation}
                                           error={errors['appellation']}
                                           items={getAppellationsName(values.filteredAppellations)}
                                           label={'Select appellation'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                        </div>
                        {/*///////////////////3 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Grapes</div>

                            <InputGroup name={'search'}
                                        type={'text'}
                                        value={values.queryString}
                                        label={'Search'}
                                        labelWidth={80}
                                        changeHandler={handleSearchInput}
                            />


                            <div>
                                <ListBox
                                    items={getGrapesName(values.filteredGrapes)}
                                    label={'Select grapes from the list below'}
                                    error={errors.selectedGrapes}
                                    //handleBlur={handleBlur}
                                    changeHandler={changeHandler}
                                    name={'currentGrape'}/>
                            </div>

                            {
                                values.selectedGrapes.length > 0 &&
                                <>
                                    <div className='card'>

                                        <div className='row m-1'>
                                            <div className='col p-0 font-weight-bold'>Selected grapes:</div>
                                            <div className='col p-0 text-right'>

                                                <button onClick={resetGrapes} className='btn btn-primary btn-sm'>Reset
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            {
                                                values.selectedGrapes.map((grape, i) => {
                                                    return <span key={i} className='badge badge-info m-1'>{grape}</span>
                                                })
                                            }
                                        </div>
                                    </div>

                                </>
                            }


                        </div>
                    </div>


                </form>

            </>
        );
    }
;