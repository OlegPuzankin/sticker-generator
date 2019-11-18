import React from 'react';

export const ComboBoxGroup = (props) => {


    let {label, name, items, handleBlur, changeHandler} = props;

    if (!items)
        items = [];


    return (

        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <label className="input-group-text">{label}</label>
            </div>
            <select
                name={name}
                onChange={changeHandler}
                onBlur={handleBlur}
                className="custom-select">
                <option>Select {name}</option>
                {
                    items.map((item, index)=>{
                    return <option key={index}>{item}</option>
                })
                }
            </select>
        </div>

    );
};

