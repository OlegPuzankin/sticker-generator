import React from 'react';

export const InputGroupTest = (props) => {
debugger


    const {label, name, placeholder, value, handleBlur, changeHandler, errors} = props;
    //const htmlFor=`${name} ${label}`;


    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">@</span>
            </div>
            <input type="month" className="form-control" placeholder="Username" aria-label="Username"
                   aria-describedby="basic-addon1"/>
        </div>


);
};