import React from 'react';

export const TextArea = ({value, changeHandler, label}) => {

 return (
     <div className="form-group">
         <label>{label}</label>
         <textarea value={value} onChange={changeHandler} className="form-control" rows="4"/>
     </div>
 );
};