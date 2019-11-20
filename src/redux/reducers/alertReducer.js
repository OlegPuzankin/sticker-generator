import {SHOW_ALERT_ERROR, HIDE_ALERT_ERROR} from "../types";

const initialState = {
    isShowAlert: false,
    alertText: '',
    type: ''
};

export const alertReducer = (state=initialState, action) => {
    const {payload} = action;


    switch (action.type){
        case SHOW_ALERT_ERROR:
            return {...state, alertText: payload.text, type: payload.type, isShowAlert:true};
        case HIDE_ALERT_ERROR:
            return {...state, isShowAlert:false};

        default:
            return state
    }

};

export default  initialState;