import React from 'react';

export const InputGroup = (props) => {

    function foo() {

    }

    const {label, type, name, placeholder, value, handleBlur = foo, changeHandler = foo, error = null, labelWidth = 150} = props;
    //const htmlFor=`${name} ${label}`;

    const style = {width: `${labelWidth}px`, color: error&&'red', fontWeight: error&& 'bold'};


    return (
        <>
            <div className="input-group mb-1">
                <div className='input-group-prepend' style={style}>
                    <span className="input-group-text" style={style}>{label}</span>
                </div>
                <input type={type}
                       name={name}
                       onBlur={handleBlur}
                       value={value}
                       onChange={changeHandler}
                       className="form-control"
                       placeholder={placeholder}/>

            </div>
            {/*{error && <p className='text-danger text-left'>{error}</p>}*/}
        </>

    );
};