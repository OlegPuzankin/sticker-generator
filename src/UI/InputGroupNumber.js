import React from 'react';

export const InputGroupNumber = (props) => {

    function foo() {

    }

    // const {label, type, name, placeholder, value, handleBlur = foo, changeHandler = foo, error = null, labelWidth = 150} = props;
    //const htmlFor=`${name} ${label}`;

    const style = {width: `${props.labelWidth}px`, color: props.error&&'red', fontWeight: props.error&& 'bold'};


    return (
        <>
            <div className="input-group mb-1">
                <div className='input-group-prepend' style={style}>
                    <span className="input-group-text" style={style}>{props.label}</span>
                </div>
                <input className='form-control' {...props}/>

            </div>
            {/*{error && <p className='text-danger text-left'>{error}</p>}*/}
        </>

    );
};