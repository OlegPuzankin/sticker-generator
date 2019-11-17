import React from 'react';

export const ComboBox = (props) => {

    const {label, name, value, handleBlur, changeHandler} = props;


    return (
        <div className="row mb-2 ml-0 mr-0">
            <label className="pt-2 w-50">{label}</label>
            <div className='col'>
                <select name={name}
                        //value={value}
                        onChange={changeHandler}
                        onBlur={handleBlur}
                        className="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                </select>
            </div>
        </div>
    );
};
