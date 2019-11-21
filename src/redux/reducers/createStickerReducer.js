import {SET_COUNTIES, SET_GRAPES, SET_STICKER} from "../types";

const initialState = {
    sticker: {},
    countries: [],
    grapes: []

};

export const createStickerReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case SET_STICKER:
            return {...state, sticker: payload};

        case SET_COUNTIES:
            return {...state, countries: payload};

        case SET_GRAPES:
            return {...state, grapes: payload};




        default:
            return state
    }

};