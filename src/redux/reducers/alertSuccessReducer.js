import {SHOW_ALERT_ERROR, SHOW_ALERT_SUCCESS, HIDE_ALERT_ERROR, HIDE_ALERT_SUCCESS} from "../types";

const initialState = {
    isShowAlert: false,
    alertText: '',
    type: ''
};

export const alertSuccessReducer = (state=initialState, action) => {
    const {payload} = action;


    switch (action.type){
        case SHOW_ALERT_SUCCESS:
            return {...state, alertText: payload.text, type: payload.type, isShowAlert:true};
        case HIDE_ALERT_SUCCESS:
            return {...state, isShowAlert:false};

        default:
            return state
    }

};