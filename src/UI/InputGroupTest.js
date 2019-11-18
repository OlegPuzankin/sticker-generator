import React from 'react';

export const InputGroupTest = (props) => {
debugger


    const {label, type, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    //const htmlFor=`${name} ${label}`;


    return (
        <>
            <div className="input-group mb-1">
                <div className="input-group-prepend width100">
                    <span className="input-group-text width100">{label}</span>
                </div>
                <input type={type}
                       name={name}
                       onBlur={handleBlur}
                       value={value}
                       onChange={changeHandler}
                       className="form-control"
                       placeholder={placeholder}/>

            </div>
            {errors[name] && <p className='text-danger text-left'>{errors[name]}</p>}
        </>

    );
};