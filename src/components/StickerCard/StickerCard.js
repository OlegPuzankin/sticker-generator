import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import {useHistory} from 'react-router-dom'

export const StickerCard = ({sticker, handleDeleteSticker, toggleStickerToBundle, sendStickerToEdit}) => {



    const grapes = sticker.selectedGrapes.join(', ');

    return (
        <div className="card h-100 ">
            <div className="card-body d-flex flex-column justify-content-between">
                <div className='d-flex flex-row justify-content-between'>
                    <div className="card-title font-weight-bold w-80">{sticker.originalTitle}</div>
                    <div className='pointer' onClick={() => handleDeleteSticker(sticker.id)}>
                        <i className="fas fa-trash-alt"> </i>
                    </div>
                    <div className='pointer' onClick={() => sendStickerToEdit(sticker)}>
                        <i className="fas fa-edit"> </i>
                    </div>
                </div>


                <div className='card-text'>Country: {sticker.country}</div>
                <div className='card-text'>Region control: {sticker.regionControl}</div>

                <div className='card-text'>Region: {sticker.region}</div>
                <div className='card-text'>Appellation: {sticker.appellation}</div>
                <div className="card-text">Grapes: {grapes}</div>

                <div className='text-center mt-1'>
                    {sticker.isAddedToBundle
                        ?
                        <button className="btn btn-primary w-50"
                                onClick={() => toggleStickerToBundle(sticker.id)}>Remove</button>
                        : <button className="btn btn-warning w-50"
                                  onClick={() => toggleStickerToBundle(sticker.id)}>Add</button>
                    }
                </div>
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