import React from 'react';

export const InputRowNumber = (props) => {

    //console.log('props INPUT row', props);
    const {label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    const htmlFor=`${name} ${label}`;
    //debugger
    return (

        <div className="row mb-2 ml-0 mr-0">
            <label htmlFor={htmlFor} className="pt-2 w-50">{label}</label>
            <div className="col p-0">
                <input type={'number'}
                       step={0.5}
                       name={name}
                       value={value}
                       onChange={changeHandler}
                       onBlur={handleBlur}
                       className="form-control"
                       id={htmlFor}
                       placeholder={placeholder}/>
                {errors[name] && <p className='text-danger text-left'>{errors[name]}</p>}
            </div>
        </div>

    );
};

//col-lg-4 col-form-label