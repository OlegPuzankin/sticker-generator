import React from 'react';
import {useDispatch} from "react-redux";
import {hideError} from "../redux/actions/alertActions";



export const Alert = ({alert}) => {
    console.log('alert props', alert)
    const dispatch =useDispatch();

    if(!alert.isShowAlert)
        return  null;



    return (
        <div className={`alert alert-${alert.type || 'secondary'} text-center alert-dismissible`} role="alert">
            {alert.alertText}
            <button type="button" className="close" aria-label="Close" >
                <span aria-hidden="true" onClick={()=>dispatch(hideError())}>&times;</span>
            </button>
        </div>
    )
};

//onClick={hide}