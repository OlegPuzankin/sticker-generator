import React from 'react';

export const InputRow = (props) => {

    console.log('props INPUT row', props);
    const {type, label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    const htmlFor=`${name} ${label}`;

    //console.log('errors[name]', errors[name]);
    //debugger
    return (

        <div className="row mb-2 ml-0 mr-0">
            <label htmlFor={htmlFor} className="pt-2 w-25">{label}</label>
            <div className="col">
                <input type={type || 'text'}
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