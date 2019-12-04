import React from 'react';

export const StickerCard = ({sticker, handleDeleteSticker, toggleStickerToBundle}) => {



    const grapes = sticker.selectedGrapes.join(', ');

    return (
        <div className="card h-100 ">
            <div className="card-body d-flex flex-column justify-content-between">
                <div className='go-button pointer' onClick={() => handleDeleteSticker(sticker.id) }>X</div>
                <h5 className="card-title">{sticker.originalTitle}</h5>
                <p className='card-text'>Country: {sticker.country}</p>
                <p className="card-text">Grapes: {grapes}</p>
                {/*<button className="btn btn-danger m-1"*/}
                {/*        onClick={() => handleDeleteSticker(sticker.id)}> Delete Sticker*/}
                {/*</button>*/}

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