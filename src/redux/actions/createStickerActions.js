import {SET_COUNTIES, SET_GRAPES, SET_STICKER} from "../types";

export const setSticker = (sticker)=>({
    type: SET_STICKER,
    payload: sticker

});

export const setCountriesData = (countries)=>({
    type: SET_COUNTIES,
    payload: countries

});

export const setGrapes= (grapes)=>({
    type: SET_GRAPES,
    payload: grapes

});