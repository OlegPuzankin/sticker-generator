import React from 'react';

export const ComboBox = (props) => {

    let {label, name, items, handleBlur, changeHandler} = props;

    if(!items)
        items=[];


    return (
        <div className="form-group">
            <label>{label}</label>

            <select className="form-control"
                    name={name}
                    onChange={changeHandler}
                    onBlur={handleBlur}>

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

