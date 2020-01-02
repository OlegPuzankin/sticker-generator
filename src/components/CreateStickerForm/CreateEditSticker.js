import React from 'react';
import validateCreateStickerForm from "./validateCreateStickerForm";
import {ListBox} from "../../UI/ListBox";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {InputGroup} from "../../UI/InputGroup";
import {useDispatch, useSelector} from "react-redux";
import {Alert} from "../../UI/Alert";
import {hideAlert, showAlert} from "../../redux/actions/alertActions";

import {Loader} from "../../UI/Loader";
import {addItemInCollection, getItemCollectionById} from "../../firebase/firebaseFunctions";
import {
    getAppellationsName,
    getCountriesName,
    getGrapesName, getHarvestYearsName,
    getProducersName,
    getRegionsName
} from "../../functions/utils";
import useFormValidationStickerForm from "../Auth/useFormValidationStickerForm";
import {Transition} from "react-transition-group";
import {addStickerToStore, updateStickerInStore} from "../../redux/actions/stickersActions";
import {
    selectAppellations,
    selectCountries,
    selectGrapes, selectHarvestYears, selectIsLoading,
    selectProducers,
    selectRegions
} from "../../redux/selectors/firebase-redux-selectors";
import {selectFormState} from "../../redux/selectors/form-state-selectors";


const regionControlTypes = ['None', 'PDO', 'PJI'];
const colors = ['червоне', 'біле', 'рожеве'];


export const CreateEditSticker = (props) => {
        //just for testing purpose
        //const [toggle, setToggle] = React.useState(true);

        const [filteredGrapes, setFilteredGrapes] = React.useState([]);
        //const [selectedGrapes, setSelectedGrapes] = React.useState([]);

        const [filteredRegions, setFilteredRegions] = React.useState([]);
        const [filteredAppellations, setFilteredAppellations] = React.useState([]);

        const [queryString, setQueryString] = React.useState('');

        const countries = useSelector(selectCountries);
        const producers = useSelector(selectProducers);

        const regions = useSelector(selectRegions);
        const appellations = useSelector(selectAppellations);
        const grapes = useSelector(selectGrapes);
        const harvestYears = useSelector(selectHarvestYears);


        const isLoading = useSelector(selectIsLoading);

        const alertState = useSelector(state => state.alert);
        const dispatch = useDispatch();


        const stickerState = useSelector(selectFormState);
        //const test = useSelector(state=>state.stickers)
        //

        const {changeHandler, submitHandler, setValues, values, errors, isTriedSubmit, handleBlur, setIsTriedSubmit} =
            useFormValidationStickerForm(stickerState,
                validateCreateStickerForm,
                saveSticker,
                dispatch
            );


////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////

        async function saveSticker() {

            const producer = producers.find(producer => producer.name === values.producer);
            debugger

            const sticker = {
                originalTitle: values.originalTitle,
                stickerTitle:values.stickerTitle,
                color: values.color,
                producer: values.producer,
                producerFullData: producer.producerFullData,
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
                created: new Date(),
            };


            if (values.id) {

                await getItemCollectionById('stickers', stickerState.id).update(sticker);
                dispatch(updateStickerInStore({
                    ...sticker,
                    id: stickerState.id,
                    isAddedToBundle: stickerState.isAddedToBundle
                }));
                dispatch(showAlert('Sticker was updated', 'primary'));
                setTimeout(() => {
                    //setToggle(false)
                    dispatch(hideAlert());
                }, 4500);

            } else {
                const response = await addItemInCollection('stickers', sticker);

                debugger
                dispatch(addStickerToStore({...sticker, id: response.id, isAddedToBundle: false}))
                dispatch(showAlert('Sticker was created', 'primary'));
                setTimeout(() => {
                    //setToggle(false)
                    dispatch(hideAlert());
                    clearFormHandler();
                }, 4500);
            }
        }

        function resetGrapes(e) {

            e.preventDefault();
            setValues({...values, selectedGrapes: []});
            setFilteredGrapes(grapes)

        }

        function clearFormHandler() {

            setValues({
                ...values,
                id: null,
                sku: '',
                originalTitle: '',
                selectedGrapes: [],
                color: '',
                producer: '',
                country: '',
                region: '',
                currentGrape: '',
                appellation: '',
                regionControl: '',
            });
            setFilteredGrapes(grapes);
            setIsTriedSubmit(false);
        }


        ////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {

            // console.log('select country effect start');
            if (countries.length > 0) {
                // console.log('select country effect body');


                let filteredRegions = regions.filter(r => r.country === values.country);

                if (filteredRegions.length > 0) {
                    setFilteredRegions(filteredRegions)
                    // setValues({...values, filteredRegions, filteredAppellations: []});

                } else
                    setFilteredRegions([])
                //setValues({...values, filteredRegions: []});
            }
            // console.log('select country effect end');

        }, [values.country]);
        /////////////////////////SELECT REGION EFFECT////////////////////////////////////////
        React.useEffect(() => {
            // console.log('select region effect start');
            if (regions.length > 0) {
                // console.log('select region effect body');
                let filteredAppellations = appellations.filter(a => a.region === values.region);
                if (filteredAppellations.length > 0) {
                    setFilteredAppellations(filteredAppellations)
                    //console.log('values', values)
                    //setValues({...values, filteredAppellations: []});
                } else
                    setFilteredAppellations([])
            }
            // console.log('select region effect end');

        }, [values.region]);
        /////////////////////Search effect///////////////////////////////////
        React.useEffect(() => {

            //console.log('search effect');
            const query = queryString.toLowerCase();
            const filteredGrapes = grapes.filter(grape => {
                return (
                    grape.name.toLowerCase().includes(query)
                )
            });

            setFilteredGrapes(filteredGrapes)

        }, [queryString, grapes]);
        //////////////////////////select grape effect///////////////////////////
        React.useEffect(() => {

            //console.log('select grape effect start');
            if (values.currentGrape !== '') {
                //console.log('select grape effect body')
                const filtered = filteredGrapes.filter(grape => grape.name !== values.currentGrape);

                setValues({...values, selectedGrapes: [...values.selectedGrapes, values.currentGrape]});
                setFilteredGrapes(filtered);
                setQueryString('');
            }
            //console.log('select grape effect end');

        }, [values.currentGrape]);
        /////////////////////////////////LOAD STICKER TO EDIT////////////////////////////////
        React.useEffect(() => {

            if (stickerState.id) {
                //console.log('LOAD STICKER TO EDIT START');
                if (regions.length > 0) {
                    const filteredRegions = regions.filter(r => r.country === values.country);

                    if (filteredRegions.length > 0) {
                        setFilteredRegions(filteredRegions);
                        //console.log('filtered regions are set');
                    }
                }

                if (appellations.length > 0) {
                    const filteredAppellations = appellations.filter(a => a.region === values.region);

                    if (filteredAppellations.length > 0) {

                        setFilteredAppellations(filteredAppellations)
                        //console.log('filtered appellations are set');
                    }
                }


                if (grapes.length > 0) {
                    const _filteredGrapes = [];
                    grapes.forEach(g => {
                        if (!values.selectedGrapes.includes(g.name)) {
                            _filteredGrapes.push(g)
                        }
                    });
                    setFilteredGrapes(_filteredGrapes);
                }
                //console.log('LOAD STICKER TO EDIT END')
            }
        }, [stickerState.id]);

        //regions, appellations, grapes


        //console.log('render');
        //console.log(stickerState.id)
        console.log('values', values);
        console.log('stickerState', stickerState);
        // console.log('isTriedSubmit', isTriedSubmit)

        if (isLoading) {
            return <Loader/>
        }


        return (
            <>
                <form className='container mt-2' onSubmit={submitHandler}>
                    <div className=' alert-container'>

                        <Transition
                            in={alertState.isShowAlert}
                            timeout={{
                                enter: 800,
                                exit: 400
                            }}
                            mountOnEnter
                            unmountOnExit
                        >{
                            state => (<div className={`animation-container ${state}`}>
                                <Alert alert={alertState} hide={() => dispatch(hideAlert())}/>

                            </div>)
                        }

                        </Transition>

                    </div>

                    {/*///////////////////TITLE ///////////////////////////////*/}
                    <div className='row justify-content-start mt-2'>

                        <div className='col-10 mb-2'>

                            <InputGroup name={'originalTitle'}

                                        value={values.originalTitle}
                                        label={'Original title'}
                                        type={'text'}
                                        labelWidth={120}
                                        placeholder={'Enter title'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        error={isTriedSubmit && errors['originalTitle']}/>

                            <InputGroup name={'stickerTitle'}
                                        value={values.stickerTitle}
                                        label={'Sticker title'}
                                        type={'text'}
                                        labelWidth={120}
                                        placeholder={'Enter sticker title'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        error={isTriedSubmit && errors['stickerTitle']}/>
                        </div>


                        <div className='col-2'>
                            {/*////////////////////////Buttons///////////////////////////*/}
                            <div className='mb-1'>
                                <button onSubmit={submitHandler} className='btn btn-primary w-100'>Done</button>
                            </div>
                            <button onClick={clearFormHandler} className='btn btn-danger w-100'>Clear</button>
                        </div>

                    </div>
                    {/*///////////////////2_ROW///////////////////////////////*/}
                    <div className='row align-items-start'>
                        {/*///////////////////1 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Basic parameters</div>

                            <ComboBoxGroup name='color'
                                           placeholder={'Select color'}
                                           error={isTriedSubmit && errors['color']}
                                           items={colors}
                                           value={values.color}
                                           label={'Wine`s Color'}
                                           changeHandler={changeHandler}/>

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
                                        label={'Serving temp °С'}/>


                            <ComboBoxGroup name='harvestYear'
                                           placeholder={'Select harvest year'}
                                           error={errors['harvestYear']}
                                           items={getHarvestYearsName(harvestYears)}
                                           value={values.harvestYear}
                                           label={'Harvest year'}
                                           changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />


                            <InputGroup name={'bottlingYear'}
                                        type={'date'}
                                        value={values.bottlingYear}
                                        error={errors['bottlingYear']}
                                        label={'Bottling year'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <InputGroup name={'lotNumber'}
                                        type={'text'}
                                        value={values.lotNumber}
                                        error={isTriedSubmit && errors['lotNumber']}
                                        label={'Lot number'}
                                        changeHandler={changeHandler}
                                //handleBlur={handleBlur}
                            />

                            <InputGroup name={'sku'}
                                        value={alertState.sku}
                                        label={'SKU'}
                                        type={'text'}
                                        placeholder={'Enter SKU'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        error={errors['sku']}/>


                        </div>
                        {/*///////////////////2 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Region parameters</div>

                            <ComboBoxGroup name='producer'
                                           placeholder={'Select producer'}
                                           error={isTriedSubmit && errors['producer']}
                                           value={values.producer}
                                           items={getProducersName(producers)}
                                           label={'Select producer'}
                                           changeHandler={changeHandler}
                                           handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='regionControl'
                                           value={values.regionControl}
                                           placeholder={'Select control type'}
                                           error={isTriedSubmit && errors['regionControl']}
                                           items={regionControlTypes}
                                           label={'Origin control'}
                                           changeHandler={changeHandler}
                                           handleBlur={handleBlur}
                            />
                            <ComboBoxGroup name='country'
                                           value={values.country}
                                           placeholder={'Select country'}
                                           error={isTriedSubmit && errors['country']}
                                           items={getCountriesName(countries)}
                                           label={'Select country'}
                                           changeHandler={changeHandler}
                                           handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='region'
                                           placeholder={'Select region'}
                                           value={values.region}
                                           error={errors['region']}
                                           items={getRegionsName(filteredRegions)}
                                           label={'Select region'}
                                           changeHandler={changeHandler}
                                           handleBlur={handleBlur}
                            />

                            <ComboBoxGroup name='appellation'
                                           placeholder={'Select appellation'}
                                           value={values.appellation}
                                           error={errors['appellation']}
                                           items={getAppellationsName(filteredAppellations)}
                                           label={'Select appellation'}
                                           changeHandler={changeHandler}
                                           handleBlur={handleBlur}
                            />

                        </div>
                        {/*///////////////////3 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Grapes</div>

                            <InputGroup name={'search'}
                                        type={'search'}
                                        value={queryString}
                                        label={'Search'}
                                        labelWidth={80}
                                        changeHandler={e => setQueryString(e.target.value)}
                            />


                            <div>
                                <ListBox
                                    items={getGrapesName(filteredGrapes)}
                                    label={'Select grapes from the list below'}
                                    error={isTriedSubmit && errors.selectedGrapes}
                                    handleBlur={handleBlur}
                                    changeHandler={changeHandler}
                                    height={200}
                                    name={'currentGrape'}/>
                            </div>

                            {
                                values.selectedGrapes.length > 0 &&
                                <>
                                    <div className='card'>

                                        <div className='row m-1'>
                                            <div className='col p-0 font-weight-bold'>Selected grapes:</div>
                                            <div className='col p-0 text-right'>

                                                <button onClick={resetGrapes} className='btn btn-danger btn-sm'>Reset
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