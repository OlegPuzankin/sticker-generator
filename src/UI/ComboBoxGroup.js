import React from 'react';

export const ComboBoxGroup = (props) => {


    let {label, placeholder, items, error,inputAttributes} = props;

    if (!items)
        items = [];

    //console.log('ComboBoxGroup',props);
    const style = {color: error && 'red', fontWeight: error && 'bold'};


    return (
        <>
            <div className="input-group mb-1">
                <div className="input-group-prepend label-width">
                    <label className="input-group-text label-width" style={style}>{label}</label>
                </div>
                <select className="custom-select" {...inputAttributes}>

                    <option>{placeholder}</option>
                    {
                        items.map((item, index) => {
                            return <option key={index} value={item}>{item}</option>
                        })
                    }
                </select>
            </div>
            {/*{error && <p className='text-danger text-left'>{error}</p>}*/}
        </>
    );
};

