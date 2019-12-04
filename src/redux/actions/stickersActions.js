import {ADD_STICKER_TO_BUNDLE, REMOVE_STICKER_FROM_BUNDLE} from "../types";

export const addStickerToBundle = (sticker)=>({
    type: ADD_STICKER_TO_BUNDLE,
    payload: sticker
});

export const removeStickerFromBundle = (stickerId)=>({
    type: REMOVE_STICKER_FROM_BUNDLE,
    payload: stickerId
});


