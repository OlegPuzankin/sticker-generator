import {
    SET_APPELLATIONS,
    SET_COUNTRIES,
    SET_GRAPES,
    SET_LOADING,
    SET_PRODUCERS,
    SET_REGIONS
} from "../types";

const initialState = {
    countries: [],
    grapes: [],
    producers: [],
    regions: [],
    appellations: [],
    harvestYears:[],
    isLoading:true

};

export const firebaseReduxReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){

        case SET_COUNTRIES:
            return {...state, countries: payload};

        case SET_GRAPES:
            return {...state, grapes: payload};

        case SET_REGIONS:
            return {...state, regions: payload};

        case SET_APPELLATIONS:
            return {...state, appellations: payload};

        case SET_PRODUCERS:
            return {...state, producers: payload};

        case SET_LOADING:
            return {...state, isLoading: payload}

        default:
            return state
    }

};