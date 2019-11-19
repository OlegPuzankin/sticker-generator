import {SHOW_ALERT_ERROR, SHOW_ALERT_SUCCESS, HIDE_ALERT_ERROR , HIDE_ALERT_SUCCESS} from "../types";

export const showError = (text, type)=>({

    type: SHOW_ALERT_ERROR,
    payload: {text, type}

});


export const showSuccess = (text, type)=>({

    type: SHOW_ALERT_SUCCESS,
    payload: {text, type}

});

export const hideError = ()=>({
    type: HIDE_ALERT_ERROR

});

export const hideSuccess = ()=>({
    type: HIDE_ALERT_SUCCESS

});