import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSticker, loadCollection, loadStickers} from "../firebase/firebaseFunctions";
import {Loader} from "../UI/Loader";
import {StickerCard} from "./StickerCard/StickerCard";
import {InputGroup} from "../UI/InputGroup";
import {addStickerToBundle, removeStickerFromBundle} from "../redux/actions/stickersActions";

export const Home = (props) => {

    const {stickersBundle} = useSelector(state => state.stickers);
    const dispatch = useDispatch();


    const [stickers, setStickers] = React.useState([]);
    const [query, setQuery] = React.useState('');

    const [filteredStickers, setFilteredStickers] = React.useState([]);

    async function loadData() {
        const response = await loadStickers();
        const stickers = response.map(s => {
            return {...s, isAddedToBundle: false}
        })
        setStickers(stickers);
    }

    React.useEffect(() => {
        const filteredStickers = stickers.filter(sticker => {
            return (
                sticker.country.toLowerCase().includes(query.toLowerCase())
                ||
                sticker.originalTitle.toLowerCase().includes(query.toLowerCase())
            )
        });

        setFilteredStickers(filteredStickers)

    }, [query, stickers]);


    function handleDeleteSticker(stickerId) {
    debugger
        const stickerRef = getSticker(stickerId);
    debugger
        stickerRef.delete().then(() => {
            const updatedStickers = stickers.filter(s => s.id !== stickerId);
            setStickers(updatedStickers);
        })
    }



    function toggleStickerToBundle(stickerId) {

        const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        const s = stickers[stickerIndex]

        if (s.isAddedToBundle) {
            dispatch(removeStickerFromBundle(s.id));
        } else
            dispatch(addStickerToBundle(s));


        const updatedSticker = {...s, isAddedToBundle: !s.isAddedToBundle};

        const updatedStickers = [...stickers];
        updatedStickers[stickerIndex] = updatedSticker;
        setStickers(updatedStickers);

    }

    function handleRemoveStickerFromBundle(stickerId) {
        const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        const s = stickers[stickerIndex]

        dispatch(removeStickerFromBundle(s.id));

        const updatedSticker = {...s, isAddedToBundle: false};

        const updatedStickers = [...stickers];
        updatedStickers[stickerIndex] = updatedSticker;
        setStickers(updatedStickers);

    }

    React.useEffect(() => {
        loadData()
    }, [])


    // console.log('stickers', stickers);
    // console.log('stickersBundle', stickersBundle)
    console.log('filteredStickers', filteredStickers)


    if (stickers.length === 0)
        return (<Loader/>)


    return (
        <div className='container'>
            <div className='row mt-2'>
                <div className='col-10 p-1'>
                    <InputGroup name={'search'}
                                type={'text'}
                                value={query}
                                label={'Search by country'}
                                labelWidth={180}
                                changeHandler={e => setQuery(e.target.value)}
                    />

                </div>
                <div className='col-2 p-1'>
                    <button type="button" className="btn btn-primary">
                       Go to preview <span className="badge badge-light">{stickersBundle.length}</span>
                    </button>

                </div>


            </div>
            <div className='row mt-2 justify-content-center'>
                {
                    filteredStickers.map((sticker) => {
                        return (
                            <div className='col-4 p-1' key={sticker.id}>
                                <StickerCard sticker={sticker}
                                             stickersBundle={stickersBundle}
                                             toggleStickerToBundle={toggleStickerToBundle}
                                             handleDeleteSticker={handleDeleteSticker}
                                            />

                            </div>
                        )
                    })
                }
            </div>

        </div>
    );
};

