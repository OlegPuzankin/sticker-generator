import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getSticker, loadCollection, loadStickers} from "../firebase/firebaseFunctions";
import {Loader} from "../UI/Loader";
import {StickerCard} from "./StickerCard/StickerCard";
import {InputGroup} from "../UI/InputGroup";
import {addStickerToBundle, removeStickerFromBundle, setStickerState} from "../redux/actions/stickersActions";
import {hideAlert} from "../redux/actions/alertActions";
import {AddStickerCard} from "./StickerCard/AddStickerCard";

export const StickerCatalog = ({history}) => {

    const {stickersBundle} = useSelector(state => state.stickers);
    const dispatch = useDispatch();


    const [stickers, setStickers] = React.useState([]);
    const [query, setQuery] = React.useState('');
    const [loading, setLoading] = React.useState(false);

    const [filteredStickers, setFilteredStickers] = React.useState([]);


    async function loadData() {
        setLoading(true);
        const response = await loadStickers();
        const stickers = response.map(s => {
            return {...s, isAddedToBundle: false}
        });
        if (stickersBundle.length > 0) {
            stickers.forEach(s => {
                stickersBundle.forEach(sb => {
                    if (s.id === sb.id) {
                        s.isAddedToBundle = true
                    }
                })
            })
        }
        setStickers(stickers);
        setLoading(false)
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
        const stickerRef = getSticker(stickerId);
        stickerRef.delete().then(() => {
            const updatedStickers = stickers.filter(s => s.id !== stickerId);
            setStickers(updatedStickers);
        })
    }

    function sendStickerToEdit(sticker) {
        // debugger

        dispatch(setStickerState(sticker));
        dispatch(hideAlert());

        history.push('/create')
    }


    function toggleStickerToBundle(stickerId) {

        const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        const s = stickers[stickerIndex];

        if (s.isAddedToBundle) {
            dispatch(removeStickerFromBundle(s.id));
        } else
            dispatch(addStickerToBundle(s));


        const updatedSticker = {...s, isAddedToBundle: !s.isAddedToBundle};

        const updatedStickers = [...stickers];
        updatedStickers[stickerIndex] = updatedSticker;
        setStickers(updatedStickers);

    }


    React.useEffect(() => {

        loadData()
    }, []);


    // console.log('stickers', stickers);
    // console.log('stickersBundle', stickersBundle)
    // console.log('filteredStickers', filteredStickers)
    // console.log(history)


    if (loading)
        return (<Loader/>);


    return (
        <>
            <div className='position-fixed add-sticker-container'>
                <button onClick={()=>history.push('/create') } className='btn btn-primary btn-circle '>
                    <i className="fas fa-plus fa-lg"></i>
                </button>
            </div>

            <div className='container'>
                <div className='row mt-2'>
                    <div className='col-10 p-1'>
                        <InputGroup name={'search'}
                                    type={'search'}
                                    value={query}
                                    label={'Search by country or title'}
                                    labelWidth={200}
                                    changeHandler={e => setQuery(e.target.value)}
                        />

                    </div>
                    <div className='col-2 p-1'>
                        <button disabled={stickersBundle.length === 0}
                                type="button"
                                className="btn btn-primary w-100"
                                onClick={() => {
                                    history.push('/preview')
                                }}>
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
                                                 sendStickerToEdit={sendStickerToEdit}
                                    />

                                </div>
                            )
                        })
                    }

                </div>

            </div>
        </>
    );
};

