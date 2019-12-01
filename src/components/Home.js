import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSticker, loadAndSyncStickers} from "../firebase/firebaseFunctions";
import {Loader} from "../UI/Loader";
import {StickerCard} from "./StickerCard/StickerCard";
import {InputGroup} from "../UI/InputGroup";
import {addStickerToBundle} from "../redux/actions/stickersActions";

export const Home = (props) => {

    const {stickersBundle} = useSelector(state => state.stickers);
    const dispatch = useDispatch();


    const [stickers, setStickers] = React.useState([]);
    const [queryByCountry, setQueryByCountry] = React.useState('');
    const [queryByTitle, setQueryByTitle] = React.useState('');

    const [filteredStickers, setFilteredStickers] = React.useState([]);

    function loadData() {
        loadAndSyncStickers(setStickers);
        debugger
        //setStickers(stickers)

    }

    React.useEffect(() => {

        const filteredStickers = stickers.filter(sticker => {
            return (
                sticker.country.toLowerCase().includes(queryByCountry.toLowerCase())
            )
        });

        setFilteredStickers(filteredStickers)

    }, [queryByCountry, stickers]);

    React.useEffect(() => {

        const filteredStickers = stickers.filter(sticker => {
            return (
                sticker.originalTitle.toLowerCase().includes(queryByTitle.toLowerCase())
            )
        });

        setFilteredStickers(filteredStickers)

    }, [queryByTitle, stickers]);

    function handleDeleteSticker(stickerId) {
        debugger
        const stickerRef = getSticker(stickerId);
        debugger
        stickerRef.delete()
    }

    function handleAddStickerToBundle(stickerId) {

        const stickerIndex = stickers.findIndex(s => s.id === stickerId)
        debugger
        const s = stickers[stickerIndex]

        dispatch(addStickerToBundle(s))

    }

    React.useEffect(() => {
        loadData()
    }, [])


    console.log('stickers', stickers);
    console.log('stickersBundle',stickersBundle)


    if (stickers.length === 0)
        return (<Loader/>)


    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col p-1'>
                    <InputGroup name={'search'}
                                type={'text'}
                                value={queryByCountry}
                                label={'Search by country'}
                                labelWidth={180}
                                changeHandler={e => setQueryByCountry(e.target.value)}
                    />

                </div>

                <div className='col p-1'>

                    <InputGroup name={'search'}
                                type={'text'}
                                value={queryByTitle}
                                label={'Search by title'}
                                labelWidth={180}
                                changeHandler={e => setQueryByTitle(e.target.value)}
                    />
                </div>


            </div>
            <div className='row mt-2 justify-content-center'>
                {
                    filteredStickers.map((sticker) => {
                        return (
                            <div className='col-4 p-1' key={sticker.id}>
                                <StickerCard sticker={sticker}
                                             stickersBundle={stickersBundle}
                                             handleDeleteSticker={handleDeleteSticker}
                                             handleAddStickerToBundle={handleAddStickerToBundle}/>

                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

