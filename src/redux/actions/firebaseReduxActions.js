import {
    SET_APPELLATIONS,
    SET_COUNTIES,
    SET_GRAPES,
    SET_HARVEST_YEARS,
    SET_LOADING,
    SET_PRODUCERS,
    SET_REGIONS
} from "../types";


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

export const setGrapesData= (grapes)=>({
    type: SET_GRAPES,
    payload: grapes

});

export const setProducersData= (producers)=>({
    type: SET_PRODUCERS,
    payload: producers

});

export const setHarvestYears= (years)=>({
    type: SET_HARVEST_YEARS,
    payload: years

});
export const setLoading= (state)=>({
    type: SET_LOADING,
    payload: state

});