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

                <div> {sticker.producer}</div>
                <div> {sticker.originalTitle}</div>
                <div> {sticker.country}</div>
                <div> {sticker.region}</div>
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