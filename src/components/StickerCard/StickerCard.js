import React from 'react';

export const StickerCard = ({sticker, handleDeleteSticker, handleAddStickerToBundle, stickersBundle}) => {

    const index =stickersBundle.findIndex(s=>s.id===sticker.id);
    let isAdded;
    if (index>=0)
        isAdded=true;


    console.log('index', index)
    const grapes = sticker.selectedGrapes.join(', ');

    return (
     <div className="card">
             <div className="card-body">
                 <h5 className="card-title">{sticker.originalTitle}</h5>
                 <p className='card-text'>Country: {sticker.country}</p>
                 <p className="card-text">Grapes: {grapes}</p>
                 <button className="btn btn-danger m-1" onClick={()=>handleDeleteSticker(sticker.id)}>Delete Sticker</button>
                 <button disabled={isAdded} className="btn btn-info m-1" onClick={()=>handleAddStickerToBundle(sticker.id)}>Add Sticker</button>

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