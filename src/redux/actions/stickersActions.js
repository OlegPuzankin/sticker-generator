import {ADD_STICKER_TO_BUNDLE} from "../types";

export const addStickerToBundle = (sticker)=>({
    type: ADD_STICKER_TO_BUNDLE,
    payload: sticker
});


