import {SET_STICKER} from "../types";

const initialState = {
    sticker: {},

};

export const createStickerReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case SET_STICKER:
            return {...state, sticker: payload};

        default:
            return state
    }

};