import React from 'react';
import validateCreateStickerForm from "./validateCreateStickerForm";
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
    getProducersName,
    getRegionsName
} from "../../functions/utils";
import useFormValidationStickerForm from "../Auth/useFormValidationStickerForm";
import {Transition} from "react-transition-group";
import {addStickerToStore, updateStickerInStore} from "../../redux/actions/stickersActions";
import {
    selectAppellations,
    selectCountries,
    selectGrapes, selectIsLoading,
    selectProducers,
    selectRegions
} from "../../redux/selectors/firebase-redux-selectors";
import {selectFormState} from "../../redux/selectors/form-state-selectors";
import {ListBoxGrapes} from "../../UI/ListBoxGrapes";
import {FirebaseContext} from "../../firebase";
import {Redirect} from "react-router-dom";


const regionControlTypes = ['None', 'PDO', 'PJI'];
const colors = ['червоне', 'біле', 'рожеве'];


export const CreateEditSticker = (props) => {
        const {user} = React.useContext(FirebaseContext);

        const grapes = useSelector(selectGrapes);
        const [filteredGrapes, setFilteredGrapes] = React.useState(grapes);
        const [filteredRegions, setFilteredRegions] = React.useState([]);
        const [filteredAppellations, setFilteredAppellations] = React.useState([]);

        const [queryString, setQueryString] = React.useState('');

        const countries = useSelector(selectCountries);
        const producers = useSelector(selectProducers);
        const regions = useSelector(selectRegions);
        const appellations = useSelector(selectAppellations);


        const isLoading = useSelector(selectIsLoading);
        const alertState = useSelector(state => state.alert);
        const dispatch = useDispatch();

        const stickerState = useSelector(selectFormState);

        const {changeHandler, submitHandler, setValues, values, errors, isTriedSubmit, handleBlur, setIsTriedSubmit} =
            useFormValidationStickerForm(stickerState,
                validateCreateStickerForm,
                handleDone,
                dispatch
            );


////////////////////////////////////////////////////FUNCTIONS///////////////////////////////////////////

        function clearForm() {
            setValues({
                ...values,
                id: null,
                sku: '',
                originalTitle: '',
                stickerTitle: '',
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


        function getStickerState() {
            const producer = producers.find(producer => producer.name === values.producer);
            debugger

            return {
                originalTitle: values.originalTitle,
                stickerTitle: values.stickerTitle,
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
                sku: values.sku,
                created: new Date(),
            };
        }

        async function handleDone() {
            debugger
            const sticker = getStickerState();
            if (values.id) {
                await updateSticker(sticker)
            } else {
                await saveSticker(sticker)
            }
        }


        async function saveSticker(sticker) {
            const response = await addItemInCollection('stickers', sticker);
            debugger
            dispatch(addStickerToStore({...sticker, id: response.id, isAddedToBundle: false}));
            dispatch(showAlert('Sticker was created', 'primary'));
            setTimeout(() => {
                dispatch(hideAlert());
                setValues({...values, id: null})
            }, 4500);

        }


        async function updateSticker(sticker) {
            await getItemCollectionById('stickers', values.id).update(sticker);
            dispatch(updateStickerInStore({
                ...sticker,
                id: stickerState.id,
                isAddedToBundle: stickerState.isAddedToBundle
            }));
            dispatch(showAlert('Sticker was updated', 'primary'));
            setTimeout(() => {
                dispatch(hideAlert());
                // setValues({...values, id:null})
            }, 4500);

        }

        function resetGrapes(e) {
            // e.preventDefault();
            setValues({...values, selectedGrapes: []});
            setFilteredGrapes(grapes)
        }

        function clearFormHandler(e) {

            // e.preventDefault();
            clearForm();

            dispatch(showAlert('Form was cleared', 'primary'));
            setTimeout(() => {
                //setToggle(false)
                dispatch(hideAlert());
            }, 2000);
        }

        function saveAsNew() {
            values.id=null;
            console.log('values SaveAs' , values);
            handleDone()
        }

        ////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
        React.useEffect(() => {
            if (countries.length > 0) {
                let filteredRegions = regions.filter(r => r.country === values.country);

                if (filteredRegions.length > 0) {
                    setFilteredRegions(filteredRegions)

                } else
                    setFilteredRegions([])
            }

        }, [values.country]);
        /////////////////////////SELECT REGION EFFECT////////////////////////////////////////
        React.useEffect(() => {
            // console.log('select region effect start');
            if (regions.length > 0) {
                // console.log('select region effect body');
                let filteredAppellations = appellations.filter(a => a.region === values.region);
                if (filteredAppellations.length > 0) {
                    setFilteredAppellations(filteredAppellations)
                } else
                    setFilteredAppellations([])
            }
            // console.log('select region effect end');

        }, [values.region]);
        /////////////////////Search effect///////////////////////////////////
        React.useEffect(() => {

            if (queryString === '')
                setFilteredGrapes(filterSelectedGrapes(grapes, values.selectedGrapes));

            //console.log('search effect');
            if (queryString !== '') {
                const query = queryString.toLowerCase();
                const filteredGrapes = grapes.filter(grape => {
                    return (
                        grape.name.toLowerCase().includes(query)
                    )
                });
                setFilteredGrapes(filteredGrapes)
            }

        }, [queryString]);

        // function handleSelectGrape(e) {
        //     const selectedGrape=e.target.value;
        //     const selectedGrapes=[...values.selectedGrapes, selectedGrape];
        //
        //     const filtered = filterSelectedGrapes(grapes, selectedGrapes)
        //     // const filtered = filteredGrapes.filter(grape => grape.name !== selectedGrape);
        //     setValues({...values, selectedGrapes: selectedGrapes});
        //     setFilteredGrapes(filtered);
        //     setQueryString('');
        // }

        function filterSelectedGrapes(grapes, selectedGrapes) {
            return grapes.filter(g => !selectedGrapes.includes(g.name));
        }


        //////////////////////////select grape effect///////////////////////////
        React.useEffect(() => {


            if (values.currentGrape !== '') {

                const selectedGrapes = [...values.selectedGrapes, values.currentGrape];

                const filtered = filterSelectedGrapes(grapes, selectedGrapes);
                // const filtered = filteredGrapes.filter(grape => grape.name !== selectedGrape);
                setValues({...values, selectedGrapes: selectedGrapes});
                setFilteredGrapes(filtered);
                setQueryString('');
            }

        }, [values.currentGrape]);

        /////////////////////////////////LOAD STICKER TO EDIT////////////////////////////////
        React.useEffect(() => {

            if (stickerState.id) {
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
            }
        }, [stickerState.id]);

        console.log('values', values);
        console.log('stickerState', stickerState);
        // console.log('filteredGrapes', filteredGrapes);
        // console.log('values.selectedGrapes',values.selectedGrapes)

        if (!user) {
            return <Redirect to={'/'}/>
        }


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
                                enter: 700,
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

                        <div className='col-9 mb-2'>

                            <InputGroup
                                inputAttributes={{
                                    name: 'originalTitle',
                                    type: 'text',
                                    value: values.originalTitle,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                    placeholder: 'Enter original title'
                                }}
                                label={'Original title'}
                                error={isTriedSubmit && errors['originalTitle']}/>

                            <InputGroup
                                inputAttributes={{
                                    name: 'stickerTitle',
                                    type: 'text',
                                    value: values.stickerTitle,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                    placeholder: 'Enter sticker title'
                                }}
                                label={'Sticker title'}
                                error={isTriedSubmit && errors['stickerTitle']}/>
                        </div>


                        <div className='col-3'>
                            {/*////////////////////////Buttons///////////////////////////*/}
                            <div className='mb-1'>
                                <button
                                    onSubmit={submitHandler}
                                    className='btn btn-primary w-100'>
                                    {values.id ? 'Update' : 'Make new'}
                                </button>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <div className='w-100 mr-1'>
                                    <button
                                        type='button'
                                        onClick={clearFormHandler}
                                        className='btn btn-danger w-100 '>
                                        Clear form
                                    </button>
                                </div>
                                {
                                    values.id && (
                                        <div className='w-100'>
                                            <button
                                                type='button'
                                                disabled={!values.id}
                                                onClick={saveAsNew}
                                                className='btn btn-info w-100'>
                                                Save as new
                                            </button>
                                        </div>)
                                }
                            </div>
                        </div>

                    </div>
                    {/*///////////////////2_ROW///////////////////////////////*/}
                    <div className='row align-items-start'>
                        {/*///////////////////1 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Basic parameters</div>

                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'color',
                                    value: values.color,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                items={colors}
                                label={'Select color'}
                                placeholder={'Select color'}
                                error={isTriedSubmit && errors['color']}
                            />

                            <InputGroup
                                inputAttributes={{
                                    name: 'volume',
                                    type: 'number',
                                    value: values.volume,
                                    onChange: changeHandler,
                                }}
                                label={'Volume, ml'}
                                error={isTriedSubmit && errors['stickerTitle']}/>


                            <InputGroup
                                inputAttributes={{
                                    name: 'alcohol',
                                    type: 'number',
                                    value: values.alcohol,
                                    onChange: changeHandler,
                                    step: 0.5
                                }}
                                error={errors['alcohol']}
                                label={'Alcohol, %'}/>

                            <InputGroup
                                inputAttributes={{
                                    name: 'sugar',
                                    type: 'number',
                                    value: values.sugar,
                                    onChange: changeHandler,
                                    step: 0.5
                                }}
                                label={'Sugar, g/per L '}
                                error={errors['sugar']}
                            />

                            <InputGroup
                                inputAttributes={{
                                    name: 'shelfLifetime',
                                    type: 'number',
                                    value: values.shelfLifetime,
                                    onChange: changeHandler,
                                }}
                                error={errors['shelfLifetime']}
                                label={'Shelf life, years'}/>

                            <InputGroup
                                inputAttributes={{
                                    name: 'servingTemperature',
                                    type: 'number',
                                    value: values.servingTemperature,
                                    onChange: changeHandler,
                                }}
                                error={errors['servingTemperature']}
                                label={'Serving temp, °С'}/>

                            <InputGroup
                                inputAttributes={{
                                    name: 'harvestYear',
                                    type: 'number',
                                    value: values.harvestYear,
                                    onChange: changeHandler,
                                }}
                                error={errors['harvestYear']}
                                label={'Harvest year'}/>

                            <InputGroup
                                inputAttributes={{
                                    name: 'bottlingYear',
                                    type: 'date',
                                    value: values.bottlingYear,
                                    onChange: changeHandler,
                                }}
                                error={errors['bottlingYear']}
                                label={'Bottling year'}
                            />

                            <InputGroup
                                inputAttributes={{
                                    name: 'lotNumber',
                                    type: 'text',
                                    value: values.lotNumber,
                                    onChange: changeHandler,
                                }}
                                error={isTriedSubmit && errors['lotNumber']}
                                label={'Lot number'}
                            />

                            <InputGroup
                                inputAttributes={{
                                    name: 'sku',
                                    type: 'text',
                                    value: values.sku,
                                    placeholder: 'Enter SKU',
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                label={'SKU'}
                                error={errors['sku']}/>


                        </div>
                        {/*///////////////////2 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Region parameters</div>

                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'producer',
                                    value: values.producer,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                placeholder='Select producer'
                                error={isTriedSubmit && errors['producer']}
                                items={getProducersName(producers)}
                                label={'Select producer'}
                            />

                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'regionControl',
                                    value: values.regionControl,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                placeholder={'Select control type'}
                                error={isTriedSubmit && errors['regionControl']}
                                items={regionControlTypes}
                                label={'Origin control'}
                            />
                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'country',
                                    value: values.country,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                placeholder={'Select country'}
                                error={isTriedSubmit && errors['country']}
                                items={getCountriesName(countries)}
                                label={'Select country'}
                            />
                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'region',
                                    value: values.region,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                placeholder={'Select region'}
                                error={errors['region']}
                                items={getRegionsName(filteredRegions)}
                                label={'Select region'}
                            />
                            <ComboBoxGroup
                                inputAttributes={{
                                    name: 'appellation',
                                    value: values.appellation,
                                    onChange: changeHandler,
                                    onBlur: handleBlur,
                                }}
                                placeholder={'Select appellation'}
                                error={errors['appellation']}
                                items={getAppellationsName(filteredAppellations)}
                                label={'Select appellation'}
                            />
                        </div>
                        {/*///////////////////3 Column///////////////////////////////*/}
                        <div className='col'>
                            <div className='mb-2 text-center'>Grapes</div>

                            <InputGroup
                                inputAttributes={{
                                    name: 'search',
                                    type: 'search',
                                    value: queryString,
                                    placeholder: 'search grape...',
                                    onChange: e => setQueryString(e.target.value),
                                }}
                                label={'Search'}
                                labelWidth={80}
                            />
                            <div>
                                <ListBoxGrapes
                                    inputAttributes={{
                                        multiple: true,
                                        name: 'currentGrape',
                                        onChange: changeHandler,
                                        onBlur: handleBlur,
                                    }}

                                    items={filteredGrapes}
                                    label={'Select grapes from the list below'}
                                    error={isTriedSubmit && errors.selectedGrapes}
                                    height={250}
                                />
                            </div>

                            {
                                values.selectedGrapes.length > 0 &&
                                <>
                                    <div className='card'>

                                        <div className='row m-1'>
                                            <div className='col p-0 font-weight-bold'>Selected grapes:</div>
                                            <div className='col p-0 text-right'>

                                                <button type='button' onClick={resetGrapes}
                                                        className='btn btn-danger btn-sm'>Reset
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
        )
            ;
    }
;