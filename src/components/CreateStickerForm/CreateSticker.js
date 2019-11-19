import React from 'react';
import {Input} from "../../UI/Input";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateStickerForm from "./validateCreateStickerForm";

import {ListBox} from "../../UI/ListBox";
import {ComboBox} from "../../UI/ComboBox";
import {InputRow} from "../../UI/InputRow";
import {InputRowNumber} from "../../UI/InputRowNumber";
import {ComboBoxGroup} from "../../UI/ComboBoxGroup";
import {InputGroupNumber} from "../../UI/InputGroupNumber";
import {InputGroupDate} from "../../UI/InputGroupDate";
import {InputGroupTest} from "../../UI/InputGroupTest";


const INITIAL_STATE = {
    producer: '',
    originalTitle: '',
    country: '',
    volume: 750,
    alcohol: 12,
    sugar: 4,
    servingTemperature: 12,
    shelfLifetime: 12,
    lotNumber: '',
    regionControl: '',
    grapes: [],
    harvestYear: '',
    bottlingYear: ''


};

const foo = ['France', 'Italy', 'Spain'];
const fooYear = ['2012', '2013', '2014', '2015', '2016']

export const CreateSticker = (props) => {


    const {changeHandler, changeHandlerMultipleSelectHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateCreateStickerForm);

    //console.log('countries', values.countries)
    //console.log('region', values.regionControl)
    console.log('values', values)

    return (
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
                                   label={'Harvest year'}
                                   changeHandler={changeHandler}
                                   handleBlur={handleBlur}/>


                    <InputGroupTest name={'bottlingYear'}
                                    type={'month'}
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
                                   error={errors['region']}
                                   items={foo}
                                   label={'Select region'}
                                   changeHandler={changeHandler}
                                   handleBlur={handleBlur}/>

                    <ComboBoxGroup name='appellation'
                                   placeholder={'Select appellation'}
                                   error={errors['appellation']}
                                   items={foo}
                                   label={'Select appellation'}
                                   changeHandler={changeHandler}
                                   handleBlur={handleBlur}/>

                </div>
                {/*///////////////////3 Column///////////////////////////////*/}
                <div className='col'>



                    <ListBox
                        label={'Select Grapes'}
                        changeHandler={changeHandlerMultipleSelectHandler}
                        name={'grapes'}/>

                </div>
            </div>
            {/*<button onSubmit={submitHandler} className='btn btn-primary'>Submit</button>*/}
        </form>
    );
};