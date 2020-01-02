import React from 'react';
import {useSelector} from "react-redux";
import {StickerOutput} from "../StickerOutput/StickerOutput";
import {Export2Doc} from "../../exportDoc/exportDoc";

export const Preview = (props) => {

    const {stickersBundle} = useSelector(state => state.stickers);
    console.log(stickersBundle)
    return (
        <>
            <div className='container'>

                <div className='text-center'>
                    {
                        stickersBundle.length > 0 && (
                            <button className='btn btn-primary m-3 w-50'
                                    onClick={() => Export2Doc('exportContent', 'word-content')}>
                                Export as .doc
                            </button>)
                    }


                </div>


                <div id='exportContent'>
                    {
                        stickersBundle.map((sticker) => {
                            return (
                                <StickerOutput sticker={sticker} key={sticker.id}/>

                            )
                        })

                    }
                </div>


            </div>
        </>


    );
};