import {ADD_STICKER_TO_BUNDLE, REMOVE_STICKER_FROM_BUNDLE, TOGGLE_STICKER_STATUS_BUNDLE} from "../types";


const initialState = {
   stickersBundle: []


};

export const stickersReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case ADD_STICKER_TO_BUNDLE:

            return {...state, stickersBundle:[...state.stickersBundle, payload]};
        case REMOVE_STICKER_FROM_BUNDLE:
            const removed =state.stickersBundle.filter(s=>s.id!==payload)
            return {...state, stickersBundle:[...removed]};


        default:
            return state
    }

};