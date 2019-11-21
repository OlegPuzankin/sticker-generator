import React from 'react';
import {useSelector} from "react-redux";

export const Home = (props) => {

    const sticker = useSelector(state => state.sticker.sticker);
    console.log(sticker.originalTitle)

    if(Object.keys(sticker).length === 0)
        return  null

    debugger
    return (
        <div className='container'>
            <div className='card text-center'>

                <div> <strong> {sticker.producer} </strong></div>
                <div> {sticker.originalTitle}</div>
                <div> {sticker.country}</div>
                <div> {sticker.region}</div>
                <div> {sticker.appellation}</div>
                <div> {sticker.volume}</div>
                <div> {sticker.alcohol}</div>

                <div> {sticker.sugar}</div>
                <div> {sticker.servingTemperature}</div>
                <div> {sticker.shelfLifetime}</div>

                <div> {sticker.lotNumber}</div>
                <div> {sticker.harvestYear}</div>
                <div> {sticker.bottlingYear}</div>
                <div> {sticker.selectedGrapes}</div>

            </div>
        </div>
    );
};

// const INITIAL_STATE = {
//     producer: 'Italy',
//     originalTitle: '',
//     country: '',
//     region: '',
//     appellation: '',
//     volume: 750,
//     alcohol: 12,
//     sugar: 4,
//     servingTemperature: 12,
//     shelfLifetime: 12,
//     lotNumber: '',
//     regionControl: '',
//     grapes: [],
//     harvestYear: '2014',
//     bottlingYear: ''
// };