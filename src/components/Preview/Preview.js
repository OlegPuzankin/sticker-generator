import React from 'react';
import {useSelector} from "react-redux";

export const Preview = (props) => {

    const {stickersBundle} = useSelector(state => state.stickers);
    console.log(stickersBundle)
 return (
  <div>
   Preview
  </div>
 );
};