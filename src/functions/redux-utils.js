export function getUpdatedStickers(stickers, id, toggleValue) {
    return stickers.map(sticker=>{
        return sticker.id===id
            ? {...sticker, isAddedToBundle:toggleValue}
            : sticker
    });
}