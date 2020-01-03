import {SET_STICKER_STATE} from "../types";


const initialState = {
    id: null,
    sku: '123456768',
    producer: 'Felix',
    originalTitle: 'Hi Iryna',
    stickerTitle: 'hey yo',
    country: 'Іспанія',
    region: '',
    appellation: '',
    volume: 750,
    color: 'червоне',
    alcohol: 12,
    sugar: 4,
    servingTemperature: 12,
    shelfLifetime: 3,
    lotNumber: 'вказано на пляшці',
    regionControl: 'None',
    selectedGrapes: [],

    currentGrape: '',
    harvestYear: '2002',
    bottlingYear: '2018-01-01',
};

export const formStateReducer = (state=initialState, action) => {
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