import React from 'react';


export function AlertHOC (WrappedComponent, alertType, dispatch, hide){

    return function ({alert}){


        if(!alert[alertType])
            return  null;



        return (
            <div className={`alert alert-${alert.type || 'secondary'} text-center alert-dismissible`} role="alert">
                {alert.alertText}
                <button type="button" className="close" aria-label="Close" >
                    <span aria-hidden="true" onClick={()=>dispatch(hide())}>&times;</span>
                </button>
            </div>
        )
    }
}