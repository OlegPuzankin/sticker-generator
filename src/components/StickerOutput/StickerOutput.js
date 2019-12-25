import React from 'react';
import {getStickerText, getTitle} from "../../functions/processSticker";


const INITIAL_STATE = {
    producer: '',
    originalTitle: 'Some title',
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

    currentGrape: '',
    harvestYear: '2002',
    bottlingYear: '2011-11',

    harvestYears: [],

    grapes: [],
    selectedGrapes: [],
    filteredGrapes: [],
    queryString: '',

    countries: [],
    regions: [],
    appellations: [],
    producers: [],


    filteredRegions: [],
    filteredAppellations: []

};
export const StickerOutput = ({sticker}) => {
    debugger

    const title =getTitle(sticker);
    const mainText = getStickerText(sticker);

    debugger
    return (
        <tr className=''>
            <td className='w-25'>
                <h5>
                    {sticker.originalTitle}
                </h5>
            </td>

            <td className='w-75'>
                <div className='text-center font-weight-bold'>
                    {title}
                </div>
                <div>
                    {mainText}
                </div>
            </td>


        </tr>
    );
};