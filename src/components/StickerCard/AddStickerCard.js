import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import {useHistory} from 'react-router-dom'

export const AddStickerCard = ({addSticker}) => {




    return (
        <div className="card h-100 ">
            <div className="card-body d-flex flex-column justify-content-between">
                Add sticker

            </div>
        </div>
    );
};


// const sticker = {
//     originalTitle: values.originalTitle,
//     producer: values.producer,
//     country: values.country,
//     region: values.region,
//     appellation: values.appellation,
//     volume: values.volume,
//     alcohol: values.alcohol,
//     sugar: values.sugar,
//     servingTemperature: values.servingTemperature,
//     shelfLifetime: values.shelfLifetime,
//     lotNumber: values.lotNumber,
//     regionControl: values.regionControl,
//     harvestYear: values.harvestYear,
//     bottlingYear: values.bottlingYear,
//
//     selectedGrapes: values.selectedGrapes,
// };