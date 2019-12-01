import {SHOW_ALERT, HIDE_ALERT } from "../types";

export const showAlert = (text, type)=>({
    type: SHOW_ALERT,
    payload: {text, type}
});



export const hideAlert = ()=>({
    type: HIDE_ALERT
});

