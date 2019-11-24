import {SET_CREATE_STICKER_PAGE_LOADING, SET_STICKER} from "../types";


const initialState = {
    sticker: {},
    isLoading: false


};

export const createStickerReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case SET_STICKER:
            return {...state, sticker: payload};

        case SET_CREATE_STICKER_PAGE_LOADING:
            return {...state, isLoading: payload};


        default:
            return state
    }

};