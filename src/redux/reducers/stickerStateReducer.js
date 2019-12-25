import {SET_STICKER_STATE} from "../types";


const initialState = {
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
};

export const stickerStateReducer = (state=initialState, action) => {
    const {payload} = action;
    //debugger

    switch (action.type){
        case SET_STICKER_STATE:
            //debugger
            return {...state, ...payload};


        default:
            return state
    }

};