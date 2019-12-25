export function processSticker(sticker) {
    const result = []
    const title=getTitle(sticker);
}

export function getTitle(sticker) {
    const result = [];
    if(sticker.regionControl!=='None'){
        result.push('Вино контрольованих за походженням назв, виноградне, ')
    }
    else{
        result.push('Вино виноградне, ')
    }
    debugger

    if(sticker.selectedGrapes.length===1)
        result.push('сортове, ');
    else
        result.push('купажоване, ');


    if(sticker.sugar<=5)
        result.push('сухе, ');
    else if(sticker.sugar>5 && sticker.sugar<30)
        result.push('напівсухе, ');
    else if(sticker.sugar>30 && sticker.sugar<80)
        result.push('напівсолодке, ');
    else if(sticker.sugar>30 && sticker.sugar<80)
        result.push('солодке, ');

    result.push(`${sticker.color.toLowerCase()}, `);



    result.push(sticker.originalTitle);

    debugger


    return result.join('')

}

export function getStickerText(sticker) {
    const result = [];
    result.push(`Країна походження: ${sticker.country}`)

    return result.join('');
}
