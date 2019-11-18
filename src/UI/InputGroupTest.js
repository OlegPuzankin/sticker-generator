import React from 'react';

export const InputGroupTest = (props) => {



    const {label, type, name, placeholder, value, handleBlur, changeHandler, error} = props;
    //const htmlFor=`${name} ${label}`;


    return (
        <>
            <div className="input-group mb-1">
                <div className="input-group-prepend label-width">
                    <span className="input-group-text label-width">{label}</span>
                </div>
                <input type={type}
                       name={name}
                       onBlur={handleBlur}
                       value={value}
                       onChange={changeHandler}
                       className="form-control"
                       placeholder={placeholder}/>

            </div>
            {error && <p className='text-danger text-left'>{error}</p>}
        </>

    );
};