import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css'
import format from 'date-fns/format'
import {FirebaseContext} from "../../firebase";



export const StickerCard = ({sticker, handleDeleteSticker, toggleStickerToBundle, sendStickerToEdit}) => {
    const {user} = React.useContext(FirebaseContext);
    const grapes = sticker.selectedGrapes.join(', ');
    const bottlingDate = format(new Date (sticker.bottlingYear), 'dd.MM.yyyy');
    // console.log('sticker card render', sticker.isAddedToBundle, sticker.id);
    return (
        <div className='card h-100 p-2'>


            <div className='d-flex justify-content-between mb-1'>
                <div className="font-weight-bold w-80">{sticker.originalTitle}</div>
                {user && <>
                    <div className='pointer' onClick={() => handleDeleteSticker(sticker.id)}>
                        <i className="fas fa-trash-alt"> </i>
                    </div>
                    <div className='pointer' onClick={() => sendStickerToEdit(sticker)}>
                        <i className="fas fa-edit"> </i>
                    </div>
                </>}
            </div>

            <div className='d-flex flex-column justify-content-between h-100'>
                <div>
                    <div>Виробник: {sticker.producer}</div>
                    <div>Країна: {sticker.country}</div>
                    {/*<div className='card-text'>Region control: {sticker.regionControl}</div>*/}
                    {sticker.region && <div>Регіон: {sticker.region}</div>}
                    {sticker.appellation && <div>Апеласьон: {sticker.appellation}</div>}
                    <div>Сорти винограду: <em>{grapes}</em></div>
                    <span className='mr-1 text-info'>
                        SKU: {`${sticker.sku}`}&#9679;
                        {`${sticker.color}`}&#9679;
                        рік:{sticker.harvestYear}&#9679;
                        алк.:{sticker.alcohol}%&#9679;
                        {`цукор: ${sticker.sugar} g/L`}&#9679;
                        {`bottled: ${bottlingDate}`}&#9679;
                        {sticker.regionControl==='PDO' && 'PDO'}
                        {sticker.regionControl==='PJI' && 'PJI'}
                    </span>
                </div>
                <div className='d-flex mt-1 align-items-center justify-content-center'>
                    {/*<div className='w-50'>*/}
                    {/*    <span className='mr-1'>Колір:{sticker.color}</span>*/}
                    {/*    <span className='mr-1'>Рік:{sticker.harvestYear}</span>*/}

                    {/*</div>*/}
                    {/*<span>Алк.:{sticker.alcohol}%</span>*/}

                    <div className='text-center w-75'>
                        {sticker.isAddedToBundle
                            ?
                            <button className="btn btn-sm btn-primary w-100"
                                    onClick={() => toggleStickerToBundle(sticker.id)}>Remove</button>
                            : <button className="btn btn-sm btn-warning w-100"
                                      onClick={() => toggleStickerToBundle(sticker.id)}>Add</button>
                        }
                    </div>

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