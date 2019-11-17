import React from 'react';
import {Input} from "../../UI/Input";
import useFormValidation from "../Auth/useFormValidation";
import validateCreateStickerForm from "./validateCreateStickerForm";

import {ListBox} from "../../UI/ListBox";
import {ComboBox} from "../../UI/ComboBox";
import {InputRow} from "../../UI/InputRow";
import {InputRowNumber} from "../../UI/InputRowNumber";


const INITIAL_STATE = {
    wineName: '',
    volume: 750,
    alcohol: 12,
    regionControl: '',
    countries: []


};

export const CreateSticker = (props) => {


    const {changeHandler, changeHandlerMultipleSelectHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateCreateStickerForm);

console.log('countries', values.countries)
    console.log('region', values.regionControl)
    return (
        <form className=' container mt-2' onSubmit={submitHandler}>
            <div className='row align-items-center'>
                <div className='col'>
                    <Input name={'wineName'}
                           changeHandler={changeHandler}
                           handleBlur={handleBlur}
                           value={values.wineName}
                           errors={errors}
                           label={'Wine\'s name'}
                           placeholder={'Enter wine\'s name'}
                           htmlFor={'inputWineName'}/>

                </div>
            </div>

            <div className='row align-items-start'>
                <div className='col-3'>
                    <div className='mb-2 text-center'>Basic parameters</div>
                    <InputRowNumber name={'volume'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.volume}
                                    errors={errors}
                                    label={'Volume, ml'}/>

                    <InputRowNumber name={'alcohol'}
                                    changeHandler={changeHandler}
                                    handleBlur={handleBlur}
                                    value={values.alcohol}
                                    errors={errors}
                                    label={'Alcohol'}/>
                    <ComboBox name='regionControl'
                              label={'Region control'}
                              //value={values.regionControl}
                              changeHandler={changeHandler}
                              handleBlur={handleBlur}/>
                </div>

                <div className='col'>
                    <ListBox
                        label={'Grapes'}
                        changeHandler={changeHandlerMultipleSelectHandler}
                        name={'countries'}/>
                    {

                    }


                </div>

                <div className='col'>
                    <ListBox/>

                </div>
            </div>
        </form>
    );
};