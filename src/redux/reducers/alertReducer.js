import {SHOW_ALERT, HIDE_ALERT} from "../types";

const initialState = {
    isShowAlert: false,
    alertText: '',
    type: ''
};

export const alertReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case SHOW_ALERT:
            return {...state, alertText: payload.text, type: payload.type, isShowAlert:true};
        case HIDE_ALERT:
            return {...state, isShowAlert:false};
        default:
            return state
    }

};