import {SET_APPELLATIONS, SET_COUNTIES, SET_GRAPES, SET_REGIONS} from "../types";

const initialState = {
    countries: [],
    grapes: [],
    regions: [],
    appellations: []

};

export const firebaseReduxReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){

        case SET_COUNTIES:
            return {...state, countries: payload};

        case SET_GRAPES:
            return {...state, grapes: payload};


        case SET_REGIONS:
            return {...state, regions: payload};

        case SET_APPELLATIONS:
            return {...state, appellations: payload};

        default:
            return state
    }

};