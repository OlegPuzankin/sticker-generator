import React from 'react';
import {useDispatch} from "react-redux";
import {hide} from "../redux/actions/alertActions";



export const Alert = ({alert}) => {
    const dispatch =useDispatch();

    if(!alert.isShowAlert)
        return  null;

    return (
        <div className={`alert alert-${alert.type || 'secondary'} alert-dismissible`} role="alert">
            {alert.alertText}
            <button type="button" className="close" aria-label="Close" >
                <span aria-hidden="true" onClick={()=>dispatch(hide())}>&times;</span>
            </button>
        </div>
    )
};

//onClick={hide}