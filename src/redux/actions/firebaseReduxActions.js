import {SET_COUNTIES, SET_GRAPES} from "../types";


export const setCountriesData = (countries)=>({
    type: SET_COUNTIES,
    payload: countries

});

export const setGrapes= (grapes)=>({
    type: SET_GRAPES,
    payload: grapes

});