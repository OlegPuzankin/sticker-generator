import React from 'react';

export const Input = (props) => {


    console.log('props INPUT', props);
    const {type, label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    const htmlFor=`${name} ${label}`;

    //console.log('errors[name]', errors[name]);
    debugger

 return (
     <div className="form-group">
         <label htmlFor={htmlFor}>{label}</label>
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
 );
};


// for email uses aria-describedby="emailHelp"