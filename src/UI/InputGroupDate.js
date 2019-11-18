import React from 'react';

export const InputGroupDate = (props) => {
debugger


    const {label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    //const htmlFor=`${name} ${label}`;


    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend ">
                <span className="input-group-text ">{label}</span>
            </div>

            <input className={'form-control'}
                   type="month"
                   onChange={changeHandler}
                   onBlur={handleBlur}
                   name={name}/>

            <div className='w-100'>
                {errors[name] && <p className='text-danger text-left'>{errors[name]}</p>}
            </div>
        </div>

    );
};

