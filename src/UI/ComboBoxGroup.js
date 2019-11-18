import React from 'react';

export const ComboBoxGroup = (props) => {


    let {label, name, placeholder, items, handleBlur, changeHandler, error} = props;

    if (!items)
        items = [];

    console.log('ComboBoxGroup',props);


    return (
        <>
            <div className="input-group mb-1">
                <div className="input-group-prepend label-width">
                    <label className="input-group-text label-width">{label}</label>
                </div>
                <select name={name}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className="custom-select">

                    <option>{placeholder}</option>
                    {
                        items.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
            {error && <p className='text-danger text-left'>{error}</p>}
        </>
    );
};

