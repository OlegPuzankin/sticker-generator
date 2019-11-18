import React from 'react';

export const InputGroupNumber = (props) => {


    const {label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    //const htmlFor=`${name} ${label}`;


    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend label-width">
                <span className="input-group-text label-width">{label}</span>
            </div>
            <input type="number"
                   name={name}
                   step={0.5}
                   value={value}
                   onChange={changeHandler}
                   onBlur={handleBlur}
                   className="form-control"
                   placeholder={placeholder}
                   aria-label={placeholder}
                   aria-describedby="basic-addon1"/>
            <div>
                {errors[name] && <p className='text-danger text-left'>{errors[name]}</p>}
            </div>

        </div>

    );
};

