import {ADD_STICKER_TO_BUNDLE, REMOVE_STICKER_FROM_BUNDLE, RESET_STICKER_STATE, SET_STICKER_STATE} from "../types";

export const addStickerToBundle = (sticker)=>({
    type: ADD_STICKER_TO_BUNDLE,
    payload: sticker
});

export const removeStickerFromBundle = (stickerId)=>({
    type: REMOVE_STICKER_FROM_BUNDLE,
    payload: stickerId
});

export const setStickerState = (sticker)=>({
    type: SET_STICKER_STATE,
    payload: sticker
});

export const resetStickerState=()=>({
    type:RESET_STICKER_STATE
})

