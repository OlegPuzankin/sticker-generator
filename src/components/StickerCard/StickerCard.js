import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'

export const StickerCard = ({sticker, handleDeleteSticker, toggleStickerToBundle}) => {



    const grapes = sticker.selectedGrapes.join(', ');

    return (
        <div className="card h-100 ">
            <div className="card-body d-flex flex-column justify-content-between">
                <div className='d-flex flex-row justify-content-between'>
                    <div className="card-title font-weight-bold">{sticker.originalTitle}</div>
                    <div className='pointer' onClick={() => handleDeleteSticker(sticker.id) }>
                        <i className="fas fa-trash-alt"></i>
                    </div>
                </div>


                <div className='card-text'>Country: {sticker.country}</div>
                <div className="card-text">Grapes: {grapes}</div>


                {sticker.isAddedToBundle
                    ?
                    <button className="btn btn-primary w-100"
                            onClick={() => toggleStickerToBundle(sticker.id)}>Remove</button>
                    : <button className="btn btn-warning w-100"
                              onClick={() => toggleStickerToBundle(sticker.id)}>Add</button>
                }

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