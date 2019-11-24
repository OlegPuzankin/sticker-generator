import {SET_COUNTIES, SET_GRAPES} from "../types";

const initialState = {
    countries: [],
    grapes: []

};

export const firebaseReduxReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){

        case SET_COUNTIES:
            return {...state, countries: payload};

        case SET_GRAPES:
            return {...state, grapes: payload};

        default:
            return state
    }

};