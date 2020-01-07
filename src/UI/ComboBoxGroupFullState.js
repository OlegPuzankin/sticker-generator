import React from 'react';

export const ComboBoxGroupFullState = (props) => {


    let {label, placeholder, items, error} = props;

    if (!items)
        items = [];
    const style = {color: error&&'red', fontWeight: error&& 'bold'};

    return (
        <>
            <div className="input-group mb-1">
                <div className="input-group-prepend label-width" >
                    <label className="input-group-text label-width" style={style}>{label}</label>
                </div>
                <select className="custom-select" {...props}>

                    <option>{placeholder}</option>
                    {
                        items.map((item, index) => {
                            return <option key={index} value={item.id}>{item.name}</option>
                        })
                    }
                </select>
            </div>
            {/*{error && <p className='text-danger text-left'>{error}</p>}*/}
        </>
    );
};

