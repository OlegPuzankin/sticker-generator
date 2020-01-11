import React from 'react';

export const InputGroup = (props) => {
    // console.log('InputGroup',props)
    const {label, error = null, labelWidth = 150, inputAttributes} = props;
    //const htmlFor=`${name} ${label}`;

    const style = {width: `${labelWidth}px`, color: error && 'red', fontWeight: error && 'bold'};


    return (
        <>
            <div className="input-group mb-1">
                <div className='input-group-prepend'>
                    <span className="input-group-text" style={style}>{label}</span>
                </div>
                <input className="form-control"
                       {...inputAttributes}/>

            </div>
            {/*{error && <p className='text-danger text-left'>{error}</p>}*/}
        </>

    );
};