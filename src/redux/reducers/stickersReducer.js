import {ADD_STICKER_TO_BUNDLE, REMOVE_STICKER_FROM_BUNDLE, RESET_STICKER_STATE, SET_STICKER_STATE} from "../types";


const initialState = {
    stickersBundle: [],
    editSticker: {},
    stickerState:{
        id: null,
        sku: '',
        producer: '',
        originalTitle: '',
        country: '',
        region: '',
        appellation: '',
        volume: 750,
        color: '',
        alcohol: 12,
        sugar: 4,
        servingTemperature: 12,
        shelfLifetime: 12,
        lotNumber: 'вказано на пляшці',
        regionControl: '',
        selectedGrapes: [],

        currentGrape: '',
        harvestYear: '2002',
        bottlingYear: '2011-11',
    }
};

export const stickersReducer = (state = initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type) {
        case ADD_STICKER_TO_BUNDLE:
            return {...state, stickersBundle: [...state.stickersBundle, payload]};

        case REMOVE_STICKER_FROM_BUNDLE:
            const removed = state.stickersBundle.filter(s => s.id !== payload)
            return {...state, stickersBundle: [...removed]};

        // case RESET_STICKER_STATE:
        //     debugger
        //     return {...state, stickerState: initialState.stickerState }

        // case SET_STICKER_STATE:
        //     debugger
        //     return {...state, stickerState: payload};

        default:
            return state
    }

};