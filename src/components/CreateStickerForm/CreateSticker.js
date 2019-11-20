import React from 'react';
import useFormValidation from "../Auth/useFormValidation";
import validateCreateStickerForm from "./validateCreateStickerForm";
import {ListBox} from "../../UI/ListBox";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {InputGroupTest} from "../../UI/InputGroupTest";
import {useDispatch, useSelector} from "react-redux";
import {setSticker} from "../../redux/actions/createStickerActions";
import {Alert} from "../../UI/Alert";
import {hideError, hideSuccess, showError} from "../../redux/actions/alertActions";
import {AlertHOC} from "../../hoc/AlertHOC";
import {alertReducer} from "../../redux/reducers/alertReducer";
import alertInitialState from '../../redux/reducers/alertReducer'


const INITIAL_STATE = {
    producer: 'Italy',
    originalTitle: '',
    country: '',
    region: '',
    appellation: '',
    volume: 750,
    alcohol: 12,
    sugar: 4,
    servingTemperature: 12,
    shelfLifetime: 12,
    lotNumber: '',
    regionControl: '',
    grapes: [],
    currentGrape: '',
    harvestYear: '2014',
    bottlingYear: ''
};



//let grapesInitial = ['Shiraz', 'Shardonney', 'Merlo', 'Caberne', 'Zinfandel', '1', '111', '112'];
const foo = ['France', 'Italy', 'Spain'];
const fooYear = ['2012', '2013', '2014', '2015', '2016'];


export const CreateSticker = (props) => {

    //let arr = ['Shiraz', 'Shardonney', 'Merlo', 'Caberne', 'Zinfandel', '1', '111', '112'];

    // console.log('createSticker props', props)

    //const alert = useSelector(state => state.alert);

    const [alertState, dispatch] = React.useReducer(alertReducer, alertInitialState);


    const {changeHandler, changeHandlerMultipleSelectHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateCreateStickerForm, saveSticker);
    const dispatchRedux = useDispatch();
    const [queryString, setQueryString] = React.useState('');
    const [filteredGrapes, setFilteredGrapes] = React.useState([]);
    const [selectedGrapes, setSelectedGrapes] = React.useState([]);
    const [grapes, setGrapes] = React.useState(['Shiraz', 'Shardonney', 'Merlo', 'Caberne', 'Zinfandel']);


    function saveSticker() {

        //debugger
        // const sticker = values;
        dispatchRedux(setSticker(values));

        props.history.push('/home')

        // dispatch(showSuccess('sticker was saved', 'primary'));
        // console.log('show alert succes')
        // setTimeout(()=>dispatch(hideSuccess()), 2000);
    }

    function handleSearchInput(e) {
        //debugger
        setQueryString(e.target.value);
        //console.log('queryString', queryString)
    }

/////////////////////////////Search effect///////////////////////////////////
    React.useEffect(() => {


        const query = queryString.toLowerCase();

        //const arr = [...filteredLinks]
        const matchedGrapes = grapes.filter(link => {
            //debugger
            return (
                link.toLowerCase().includes(query)
            )
        });
        setFilteredGrapes(matchedGrapes);


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

    React.useEffect(() => {
        //debugger
        if (values.currentGrape === '')
            return

        else {
            const result = selectedGrapes;
            result.push(values.currentGrape);
            setSelectedGrapes(result);
            setQueryString('');

            const f = grapes.filter((grape) => grape !== values.currentGrape);
            setGrapes(f)

            console.log("use effect filteredLinks", grapes);
            setFilteredGrapes(grapes)
        }


        //setFilteredLinks(filteredGrapes)

    }, [values.currentGrape]);


    //console.log('countries', values.countries)
    //console.log('region', values.regionControl)
    console.log('values', values);
    console.log('grapes', grapes);
    console.log('selected', selectedGrapes);
    console.log('selected', filteredGrapes);


    return (
        <>

            <form className='container mt-2' onSubmit={submitHandler}>


                {/*///////////////////TITLE ///////////////////////////////*/}
                <div className='row justify-content-start'>

                    <div className='col mb-2 mt-3'>

                        <InputGroupTest name={'originalTitle'}
                                        value={values.originalTitle}
                                        label={'Title'}
                                        type={'text'}
                                        placeholder={'Enter title'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        error={errors['originalTitle']}/>
                    </div>


                </div>
                {/*///////////////////2_ROW///////////////////////////////*/}
                <div className='row align-items-start'>
                    {/*///////////////////1 Column///////////////////////////////*/}
                    <div className='col'>
                        <div className='mb-2 text-center'>Basic parameters</div>

                        <InputGroupTest name={'volume'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        value={values.volume}
                                        error={errors['volume']}
                                        label={'Volume,ml'}/>


                        <InputGroupTest name={'alcohol'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        value={values.alcohol}
                                        error={errors['alcohol']}
                                        label={'Alcohol %'}/>

                        <InputGroupTest name={'sugar'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        value={values.sugar}
                                        error={errors['sugar']}
                                        label={'Sugar ml '}/>

                        <InputGroupTest name={'shelfLifetime'}
                                        type={'number'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}
                                        value={values.shelfLifetime}
                                        error={errors['shelfLifetime']}
                                        label={'Shelf lifetime'}/>

                        <InputGroupTest name={'servingTemperature'}
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


                        <InputGroupTest name={'bottlingYear'}
                                        type={'date'}
                                        value={values.bottlingYear}
                                        error={errors['bottlingYear']}
                                        label={'Bottling year'}
                                        changeHandler={changeHandler}
                                        handleBlur={handleBlur}/>

                        <InputGroupTest name={'lotNumber'}
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
                                       items={foo}
                                       label={'Select'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>
                        <ComboBoxGroup name='country'
                                       placeholder={'Select country'}
                                       error={errors['country']}
                                       items={foo}
                                       label={'Select country'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                        <ComboBoxGroup name='region'
                                       placeholder={'Select region'}
                                       value={values.region}
                                       error={errors['region']}
                                       items={foo}
                                       label={'Select region'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                        <ComboBoxGroup name='appellation'
                                       placeholder={'Select appellation'}
                                       value={values.appellation}
                                       error={errors['appellation']}
                                       items={foo}
                                       label={'Select appellation'}
                                       changeHandler={changeHandler}
                                       handleBlur={handleBlur}/>

                    </div>
                    {/*///////////////////3 Column///////////////////////////////*/}
                    <div className='col'>
                        <div className='mb-2 text-center'>Grapes</div>

                        <InputGroupTest name={'search'}
                                        type={'text'}
                                        value={queryString}
                            // error={errors['bottlingYear']}
                                        label={'Search'}
                                        labelWidth={80}
                                        changeHandler={handleSearchInput}
                                        handleBlur={handleBlur}/>

                        <ListBox
                            items={filteredGrapes}
                            label={'Select Grapes'}
                            changeHandler={changeHandler}
                            name={'currentGrape'}/>

                        <div>
                            <ul>
                                {
                                    selectedGrapes.map((grape, i) => {
                                        return <li key={i}>{grape}</li>
                                    })
                                }
                            </ul>
                            {/*<button onClick={()=>setGrapes(grapesInitial)} className='btn btn-primary'>Submit</button>*/}
                        </div>


                    </div>
                </div>
                <button onSubmit={submitHandler} className='btn btn-primary'>Submit</button>
                {/*<div className='mt-3'>*/}
                {/*    <Alert alert={alertState} hide={() => dispatch(hideError())}/>*/}
                {/*</div>*/}
            </form>

        </>
    );
};