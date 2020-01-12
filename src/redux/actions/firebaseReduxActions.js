import {
    SET_APPELLATIONS,
    SET_COUNTRIES,
    SET_GRAPES,
    SET_LOADING,
    SET_PRODUCERS,
    SET_REGIONS
} from "../types";


export const setCountriesData = (countries)=>({
    type: SET_COUNTRIES,
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


export const setLoading= (state)=>({
    type: SET_LOADING,
    payload: state

});