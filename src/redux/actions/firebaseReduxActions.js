import {SET_APPELLATIONS, SET_COUNTIES, SET_GRAPES, SET_REGIONS} from "../types";


export const setCountriesData = (countries)=>({
    type: SET_COUNTIES,
    payload: countries

});

export const setRegionsData = (regions)=>({
    type: SET_REGIONS,
    payload: regions

});

export const setAppellationsData = (appellations)=>({
    type: SET_APPELLATIONS,
    payload: appellations

});

export const setGrapes= (grapes)=>({
    type: SET_GRAPES,
    payload: grapes

});