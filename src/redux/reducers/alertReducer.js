import {SHOW_ALERT, HIDE_ALERT} from "../types";

const initialState = {
    isShowAlert: false,
    alertText: '',
    type: ''
};

export const alertReducer = (state=initialState, action) => {
    const {payload} = action;


    switch (action.type){
        case SHOW_ALERT:
            debugger
            return {...state, alertText: payload.text, type: payload.type, isShowAlert:true};
        case HIDE_ALERT:
            debugger
            return {...state, isShowAlert:false};

        default:
            return state
    }

};

export default  initialState;