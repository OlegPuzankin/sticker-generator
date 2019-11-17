import {HIDE_ALERT, SHOW_ALERT} from "../types";

export const show = (text, type)=>({
    type: SHOW_ALERT,
    payload: {text, type}

});

export const hide = ()=>({
    type: HIDE_ALERT

});