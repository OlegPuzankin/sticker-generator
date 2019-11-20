import React from 'react';
import {useSelector} from "react-redux";

export const Home = (props) => {

    const sticker = useSelector(state => state.sticker);
    debugger
    return (
        <div>
            Sticker preview
            {/*{sticker}*/}
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