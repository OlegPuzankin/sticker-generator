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
    shelfLifetime: 12,
    regionControl: '',
    grapes: [],
    harvestYear: ''


};

const countriesList = ['France', 'Italy', 'Spain'];
const producerList = ['Grange', 'Felix']

export const CreateSticker = (props) => {


    const {changeHandler, changeHandlerMultipleSelectHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateCreateStickerForm);

    //console.log('countries', values.countries)
    //console.log('region', values.regionControl)
    console.log('values', values)

    return (
        <form className='container mt-2' onSubmit={submitHandler}>

            {/*///////////////////TITLE PRODUCER///////////////////////////////*/}
            <div className='row justify-content-start'>
                <div className='col'>
                    {/*<ComboBoxGroup name='country'*/}
                    {/*               items={countriesList}*/}
                    {/*               label={'Select country'}*/}
                    {/*               changeHandler={changeHandler}*/}
                    {/*               handleBlur={handleBlur}/>*/}

                </div>

                <div className='col'>

                    <InputGroupTest name={'harvestYear'}
                                    value={values.harvestYear}
                                    type={'month'}
                                    placeholder={'Some enter'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    errors={errors}
                                    label={'Volume,ml'}/>


                    {/*<Input name={'originalTitle'}*/}
                    {/*       changeHandler={changeHandler}*/}
                    {/*       handleBlur={handleBlur}*/}
                    {/*       value={values.originalTitle}*/}
                    {/*       errors={errors}*/}
                    {/*       label={'Original title'}*/}
                    {/*       placeholder={'Enter wine\'s name'}*/}
                    {/*       htmlFor={'inputWineName'}/>*/}

                </div>


            </div>
            {/*///////////////////2_ROW///////////////////////////////*/}
            <div className='row align-items-start'>
                <div className='col'>
                    <div className='mb-2 text-center'>Basic parameters</div>

                    <InputGroupNumber name={'volume'}
                                      changeHandler={changeHandler}
                                      handleBlur={handleBlur}
                                      value={values.volume}
                                      errors={errors}
                                      label={'Volume,ml'}/>


                    <InputGroupNumber name={'alcohol'}
                                      changeHandler={changeHandler}
                                      handleBlur={handleBlur}
                                      value={values.alcohol}
                                      errors={errors}
                                      label={'Alcohol %'}/>

                    <InputGroupNumber name={'sugar'}
                                      changeHandler={changeHandler}
                                      handleBlur={handleBlur}
                                      value={values.sugar}
                                      errors={errors}
                                      label={'Sugar ml '}/>

                    <InputGroupNumber name={'shelfLifetime'}
                                      changeHandler={changeHandler}
                                      handleBlur={handleBlur}
                                      value={values.shelfLifetime}
                                      errors={errors}
                                      label={'ShelfLifetime'}/>

                    <ComboBox name='regionControl'
                              label={'Region control'}
                        //value={values.regionControl}
                              changeHandler={changeHandler}
                              handleBlur={handleBlur}/>

                    <InputGroupDate changeHandler={changeHandler}
                                    label={'Harvest'}
                                    name={'harvestYear'}
                                    errors={errors}/>




                    <ComboBoxGroup name='country'
                                   items={countriesList}
                                   label={'Select country'}
                                   changeHandler={changeHandler}
                                   handleBlur={handleBlur}/>

                </div>

                <div className='col'>
                    <ComboBox name='country'
                              items={countriesList}
                              label={'Select country'}
                              changeHandler={changeHandler}
                              handleBlur={handleBlur}/>

                </div>

                <div className='col'>

                    <ListBox
                        label={'Select Grapes'}
                        changeHandler={changeHandlerMultipleSelectHandler}
                        name={'grapes'}/>

                </div>
            </div>
        </form>
    );
};