import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getItemCollectionById} from "../firebase/firebaseFunctions";
import {Loader} from "../UI/Loader";
import {InputGroup} from "../UI/InputGroup";
import {
    addStickerToBundle,
    removeStickerFromBundle,
    setStickersAction,
    setStickerState
} from "../redux/actions/stickersActions";
import {hideAlert} from "../redux/actions/alertActions";
import {selectStickersBundle, selectStickersCatalog} from "../redux/selectors/stickers-selectors";
import {selectIsLoading} from "../redux/selectors/firebase-redux-selectors";
import {StickerCard} from "./StickerCard/StickerCard";
import {FirebaseContext} from "../firebase";

export const StickerCatalog = ({history}) => {

    const stickersBundle = useSelector(selectStickersBundle);
    const {user} = React.useContext(FirebaseContext);
    const stickers = useSelector(selectStickersCatalog);
    const loading = useSelector(selectIsLoading);
    const dispatch = useDispatch();
    const [query, setQuery] = React.useState('');
    const [filteredStickers, setFilteredStickers] = React.useState([]);

    React.useEffect(() => {

        if (stickers.length) {
            const filteredStickers = stickers.filter(sticker => {
                return (
                    sticker.country.toLowerCase().includes(query.toLowerCase())
                    ||
                    sticker.originalTitle.toLowerCase().includes(query.toLowerCase())
                    ||
                    sticker.sku.toLowerCase().includes(query.toLowerCase())
                )
            });
            setFilteredStickers(filteredStickers)
        } else
            setFilteredStickers([])

    }, [query, stickers]);


    function handleDeleteSticker(stickerId) {
        //const stickerRef = getSticker(stickerId);
        const stickerRef = getItemCollectionById('stickers', stickerId);

        stickerRef.delete().then(() => {
            const updatedStickers = stickers.filter(s => s.id !== stickerId);
            console.log(updatedStickers);
            dispatch(setStickersAction(updatedStickers));
            const stickerToRemoveFromBundle = stickersBundle.find(s => s.id === stickerId);
            if (stickerToRemoveFromBundle) {
                dispatch(removeStickerFromBundle(stickerToRemoveFromBundle))
            }
            //setStickers(updatedStickers);
        })
    }

    function sendStickerToEdit(sticker) {
        dispatch(setStickerState(sticker));
        dispatch(hideAlert());
        history.push('/create')
    }


    function toggleStickerToBundle(stickerId) {
        // const stickerIndex = stickers.findIndex(s => s.id === stickerId);
        // const s = stickers[stickerIndex];

        const s = stickers.find(s => s.id === stickerId)
        debugger


        if (s.isAddedToBundle) {
            dispatch(removeStickerFromBundle(s));
        } else
            dispatch(addStickerToBundle(s));
    }


    // console.log('stickers', stickers);
    // console.log('stickersBundle', stickersBundle)
    // console.log('filteredStickers', filteredStickers)
    // console.log('render catalog')


    if (loading)
        return (<Loader/>);


    return (
        <>
            <div className='container'>
                <div className='row mt-2'>
                    <div className='col-8 p-1'>
                        <InputGroup
                            inputAttributes = {{
                                name:'search',
                                type:'search',
                                value:query,
                                onChange:e => setQuery(e.target.value)
                            }}
                            label={'Search by country or title'}
                            labelWidth={200}
                        />

                    </div>

                    <div className='col-2 p-1'>
                        <button
                            disabled={stickersBundle.length === 0}
                            type="button"
                            className="btn btn-primary w-100"
                            onClick={() => {
                                history.push('/preview')
                            }}>
                            GO TO PREVIEW <span className="badge badge-light">{stickersBundle.length}</span>
                        </button>
                    </div>

                    {user && <div className='col-2 p-1'>
                        <button type='button' className="btn btn-info w-100" onClick={()=>history.push('/create')}> MAKE NEW</button>
                    </div>}

                </div>
                <div className='row mt-2 justify-content-center'>
                    {
                        filteredStickers.map((sticker) => {
                            return (
                                <div className='col-4 p-1' key={sticker.id}>
                                    <StickerCard sticker={sticker}
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

