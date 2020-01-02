import {createSelector} from 'reselect'

const selectStickers = state=>state.stickers;

export const selectStickersBundle=createSelector(
    [selectStickers],
    stickers=>stickers.stickersBundle
);

export const selectStickersCatalog=createSelector(
    [selectStickers],
    stickers=>stickers.stickersCatalog
);