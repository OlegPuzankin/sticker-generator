export function getCountriesName(countries) {

    return countries.map(c => c.name);
}

export function getRegionsName(regions) {
    return regions.map(r => r.name);
}

export function getAppellationsName(appellations) {
    return  appellations.map(a => a.name);
}

export function getProducersName(producers) {
    return  producers.map(p => p.name);
}

export function getGrapesName(grapes) {
    return  grapes.map(g => g.name);
}

export function getHarvestYearsName(years) {
    return  years.map(y => y.name);
}