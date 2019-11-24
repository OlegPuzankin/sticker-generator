import {SET_CREATE_STICKER_PAGE_LOADING, SET_STICKER} from "../types";

export const setSticker = (sticker)=>({
    type: SET_STICKER,
    payload: sticker

});

export const setCreateStickerPageIsLoading = (isLoading)=>({
    type: SET_CREATE_STICKER_PAGE_LOADING,
    payload: isLoading
});

