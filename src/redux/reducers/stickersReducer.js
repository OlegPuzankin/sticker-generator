import {ADD_STICKER_TO_BUNDLE} from "../types";


const initialState = {
   stickersBundle: []


};

export const stickersReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case ADD_STICKER_TO_BUNDLE:
            debugger
            return {...state, stickersBundle:[...state.stickersBundle, payload]};



        default:
            return state
    }

};