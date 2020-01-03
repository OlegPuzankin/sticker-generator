import {
    ADD_STICKER_TO_BUNDLE,
    ADD_STICKER_TO_STORE,
    REMOVE_STICKER_FROM_BUNDLE,
    SET_STICKERS,
    UPDATE_STICKER_IN_STORE
} from "../types";
import {getUpdatedStickers} from "../../functions/redux-utils";


const initialState = {
    stickersCatalog: [],
    stickersBundle: [],
};

export const stickersReducer = (state = initialState, action) => {
    const {payload} = action;

    let updatedStickers = [];

    switch (action.type) {
        case ADD_STICKER_TO_BUNDLE:
           updatedStickers=getUpdatedStickers(state.stickersCatalog, payload.id, true);
            return {...state, stickersBundle: [...state.stickersBundle, payload], stickersCatalog: updatedStickers};

        case REMOVE_STICKER_FROM_BUNDLE:

            const removed = state.stickersBundle.filter(s => s.id !== payload.id);
            updatedStickers = getUpdatedStickers(state.stickersCatalog, payload.id, false);
            return {...state, stickersBundle: [...removed], stickersCatalog: updatedStickers};

        case SET_STICKERS:

            return {...state, stickersCatalog: payload};

        case ADD_STICKER_TO_STORE:
            return {...state, stickersCatalog: [payload, ...state.stickersCatalog]};
        case UPDATE_STICKER_IN_STORE:
            debugger
            const updatedStickerIndex=state.stickersCatalog.findIndex(sticker=>sticker.id===payload.id);
            updatedStickers = [
                ...state.stickersCatalog.slice(0, updatedStickerIndex),
                payload,
                ...state.stickersCatalog.slice(updatedStickerIndex+1)
            ];
            debugger
            return {...state, stickersCatalog:updatedStickers};

        default:
            return state
    }

};