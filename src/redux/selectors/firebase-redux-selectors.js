import {createSelector} from 'reselect'

const selectFirebaseRedux = state=>state.firebaseRedux;

export const selectIsLoading=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.isLoading
);

export const selectCountries=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.countries
);

export const selectProducers=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.producers
);

export const selectRegions=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.regions
);

export const selectAppellations=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.appellations
);


export const selectHarvestYears=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.harvestYears
);

export const selectGrapes=createSelector(
    [selectFirebaseRedux],
    firebaseRedux=>firebaseRedux.grapes
);