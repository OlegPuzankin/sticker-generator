import React from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateCreateStickerForm from "./validateCreateStickerForm";
import {ListBox} from "../../UI/ListBox";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {InputGroup} from "../../UI/InputGroup";
import {useDispatch, useSelector} from "react-redux";
import {setSticker} from "../../redux/actions/createStickerActions";
import {Alert} from "../../UI/Alert";
import {hideError, showError} from "../../redux/actions/alertActions";
import {alertReducer} from "../../redux/reducers/alertReducer";
import alertInitialState from '../../redux/reducers/alertReducer'
import {FirebaseContext} from "../../firebase";
import {getInitialData} from "../../firebase-redux/firebase-redux";
import {ButtonWithBadge} from "../../UI/ButtonWithBadge";
import {useHistory} from 'react-router-dom'
import {Loader} from "../../UI/Loader";


const INITIAL_STATE = {
    producer: 'Italy',
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
    regionControl: ['None', 'PDO', 'PJI'],
    grapes: [],
    currentGrape: '',
    harvestYear: '2014',
    bottlingYear: ''
};


const foo = ['France', 'Italy', 'Spain'];
const fooYear = ['2012', '2013', '2014', '2015', '2016'];


export const CreateSticker = (props) => {

    const {firebase} = React.useContext(FirebaseContext);
    //let history = useHistory()

    const [alertState, dispatch] = React.useReducer(alertReducer, alertInitialState);


    const {changeHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateCreateStickerForm, saveSticker);


    const dispatchRedux = useDispatch();
    const firebaseRedux = useSelector(state => state.firebaseRedux);
    const sticker = useSelector(state => state.sticker);

    const [queryString, setQueryString] = React.useState('');
    const [filteredGrapes, setFilteredGrapes] = React.useState([]);
    const [selectedGrapes, setSelectedGrapes] = React.useState([]);

    const [grapes, setGrapes] = React.useState([]);
    const [countries, setCountries] = React.useState([]);
    const [regions, setRegions] = React.useState([]);
    const [appellations, setAppellations] = React.useState([]);


    function saveSticker() {

        //
        // const sticker = values;
        dispatchRedux(setSticker({...values, selectedGrapes}));

        props.history.push('/')

        // dispatch(showSuccess('sticker was saved', 'primary'));
        // console.log('show alert succes')
        // setTimeout(()=>dispatch(hideSuccess()), 2000);
    }

    function handleSearchInput(e) {
        //
        setQueryString(e.target.value);
        //console.log('queryString', queryString)
    }


    function resetGrapes(e) {

        e.preventDefault();

        const grapes = firebaseRedux.grapes.map(g => {
            return g.name
        });

        setGrapes(grapes);
        setSelectedGrapes([]);
    }

    ///////////////////////////////////////LOAD DATA FROM FIREBASE EFFECT//////////////////////////////////////////

    React.useEffect(() => {

        function fetchData() {
            getInitialData();
        }

        console.log('init data use effect start');
        fetchData();
        console.log('init data use effect end');
    }, []);

    ///////////////////////////////////UPDATE DATA FROM REDUX EFFECT/////////////////////////

    React.useEffect(() => {
        const countries = firebaseRedux.countries.map(c => {
            return c.name
        });
        setCountries(countries);

        const grapes = firebaseRedux.grapes.map(g => {
            return g.name
        });

        setGrapes(grapes);


    }, [firebaseRedux]);

///////////////////////////SELECT COUNTRY EFFECT////////////////////////////////////////
    React.useEffect(() => {
        //
        if (firebaseRedux.countries) {

            const selectedCountry = firebaseRedux.countries.filter(c => c.name === values.country);


            if (selectedCountry.length > 0){
                let regions = firebaseRedux.regions.filter(r => r.country === selectedCountry[0].name)


                if (regions.length > 0) {
                    const result = regions.map(r => (r.name))
                    setRegions(result)
                    setAppellations([])
                } else
                    setRegions([])
            }


        }

    }, [values.country]);


    /////////////////////////SELECT REGION EFFECT////////////////////////////////////////
    React.useEffect(() => {
        //
        if (firebaseRedux.regions) {

            const selectedRegion = firebaseRedux.regions.filter(r => r.name === values.region);

            if(selectedRegion.length>0){
                const appellations = firebaseRedux.appellations.filter(a => a.region === selectedRegion[0].name)


                if (appellations.length > 0) {
                    const result = appellations.map(a => (a.name))
                    setAppellations(result)
                } else
                    setAppellations([])
            }
        }


    }, [values.region]);

/////////////////////////////Search effect///////////////////////////////////
    React.useEffect(() => {
        const query = queryString.toLowerCase();
        const matchedGrapes = grapes.filter(link => {
            return (
                link.toLowerCase().includes(query)
            )
        });
        //
        setFilteredGrapes(matchedGrapes);
        //console.log('queryString', queryString)
    }, [queryString, grapes]);

    /////////////////////////////Alert effect///////////////////////////////////

    React.useEffect(() => {

        if (!(Object.keys(errors).length === 0)) {
            //console.log('use effect show')
            dispatch(showError('Please check all fields', 'danger'))
        } else {
            //console.log('use effect hide')
            dispatch(hideError())
        }

    }, [errors]);

    //////////////////////////select grape effect///////////////////////////

    React.useEffect(() => {
        //
        if (values.currentGrape !== '') {
            const result = selectedGrapes;
            result.push(values.currentGrape);
            setSelectedGrapes(result);
            setQueryString('');
            setGrapes(grapes.filter((grape) => grape !== values.currentGrape));
            // console.log("use effect filteredLinks", grapes);
            setFilteredGrapes(grapes)
        }


    }, [values.currentGrape]);


    //console.log('countries', values.countries)
    //console.log('region', values.regionControl)
    //console.log('values', values);
    // console.log('grapes', grapes);
    // console.log('selected', selectedGrapes);
    // console.log('selected', filteredGrapes);
    //console.log('firebase', firebase);

    if (sticker.isLoading) {
        return <Loader/>
    }


    return (
        <>
            {alertState.isShowAlert &&
            <div className='m-2'>
                <Alert alert={alertState} hide={() => dispatch(hideError())}/>
            </div>}

            <form className='container mt-2' onSubmit={submitHandler}>

                {/*///////////////////TITLE ///////////////////////////////*/}
                <div className='row justify-content-start'>

                    <div className='col-8 mb-2'>

                        <InputGroup name={'originalTitle'}
                                    value={values.originalTitle}
                                    label={'Title'}
                                    type={'text'}
                                    placeholder={'Enter title'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    error={errors['originalTitle']}/>
                    </div>

                    <div className='col '>
                        {/*////////////////////////NEXT BTN///////////////////////////*/}
                        <button onSubmit={submitHandler} className='btn btn-primary mr-1'>Next</button>
                        <ButtonWithBadge/>
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
                                    handleBlur={handleBlur}
                                    value={values.volume}
                                    error={errors['volume']}
                                    label={'Volume,ml'}/>


                        <InputGroup name={'alcohol'}
                                    type={'number'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.alcohol}
                                    error={errors['alcohol']}
                                    label={'Alcohol %'}/>

                        <InputGroup name={'sugar'}
                                    type={'number'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.sugar}
                                    error={errors['sugar']}
                                    label={'Sugar ml '}/>

                        <InputGroup name={'shelfLifetime'}
                                    type={'number'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.shelfLifetime}
                                    error={errors['shelfLifetime']}
                                    label={'Shelf lifetime'}/>

                        <InputGroup name={'servingTemperature'}
                                    type={'number'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.servingTemperature}
                                    error={errors['servingTemperature']}
                                    label={'Serving temp C'}/>


                        <ComboBoxGroup name='harvestYear'
                                       placeholder={'Select harvest year'}
                                       error={errors['harvestYear']}
                                       items={fooYear}
                                       value={values.harvestYear}
                                       label={'Harvest year'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>


                        <InputGroup name={'bottlingYear'}
                                    type={'date'}
                                    value={values.bottlingYear}
                                    error={errors['bottlingYear']}
                                    label={'Bottling year'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}/>

                        <InputGroup name={'lotNumber'}
                                    type={'text'}
                                    value={values.lotNumber}
                                    error={errors['lotNumber']}
                                    label={'Lot number'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}/>


                    </div>
                    {/*///////////////////2 Column///////////////////////////////*/}
                    <div className='col'>
                        <div className='mb-2 text-center'>Region parameters</div>

                        <ComboBoxGroup name='producer'
                                       placeholder={'Select producer'}
                                       error={errors['producer']}
                                       value={values.producer}
                                       items={foo}
                                       label={'Select producer'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                        <ComboBoxGroup name='regionControl'
                                       placeholder={'Select control type'}
                                       error={errors['regionControl']}
                                       items={INITIAL_STATE.regionControl}
                                       label={'Origin control'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>
                        <ComboBoxGroup name='country'
                                       placeholder={'Select country'}
                                       error={errors['country']}
                                       items={countries}
                                       label={'Select country'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                        <ComboBoxGroup name='region'
                                       placeholder={'Select region'}
                                       value={values.region}
                                       error={errors['region']}
                                       items={regions}
                                       label={'Select region'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                        <ComboBoxGroup name='appellation'
                                       placeholder={'Select appellation'}
                                       value={values.appellation}
                                       error={errors['appellation']}
                                       items={appellations}
                                       label={'Select appellation'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                    </div>
                    {/*///////////////////3 Column///////////////////////////////*/}
                    <div className='col'>
                        <div className='mb-2 text-center'>Grapes</div>

                        <InputGroup name={'search'}
                                    type={'text'}
                                    value={queryString}
                            // error={errors['bottlingYear']}
                                    label={'Search'}
                                    labelWidth={80}
                                    changeHandler={handleSearchInput}
                                    handleBlur={handleBlur}/>


                        <div>
                            <ListBox
                                items={filteredGrapes}
                                label={'Select grapes from the list below'}
                                changeHandler={changeHandler}
                                name={'currentGrape'}/>
                        </div>

                        {
                            selectedGrapes.length > 0 &&
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
                                            selectedGrapes.map((grape, i) => {
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
};