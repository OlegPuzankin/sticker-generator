import {
    ADD_STICKER_TO_BUNDLE, ADD_STICKER_TO_STORE,
    REMOVE_STICKER_FROM_BUNDLE,
    SET_STICKER_STATE,
    SET_STICKERS, UPDATE_STICKER_IN_STORE
} from "../types";

export const addStickerToBundle = (sticker)=>({
    type: ADD_STICKER_TO_BUNDLE,
    payload: sticker
});

export const removeStickerFromBundle = (sticker)=>({
    type: REMOVE_STICKER_FROM_BUNDLE,
    payload: sticker
});

export const setStickerState = (sticker)=>({
    type: SET_STICKER_STATE,
    payload: sticker
});


export const setStickersAction=stickers=>({type:SET_STICKERS, payload: stickers});

export const addStickerToStore=sticker=>({type:ADD_STICKER_TO_STORE, payload:sticker});
export const updateStickerInStore=sticker=>({type:UPDATE_STICKER_IN_STORE, payload:sticker});



