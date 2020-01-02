export function stickerOutputUtils(sticker) {
    const result = [];
    const title = getTitle(sticker);
}

export function getTitle(sticker) {
    const result = [];
    if (sticker.regionControl !== 'None') {
        result.push('Вино із захищеною географічною ознакою ')
    } else {
        result.push('Вино виноградне, ')
    }


    if (sticker.selectedGrapes.length === 1)
        result.push('сортове, ');
    else
        result.push('купажоване, ');


    if (sticker.sugar <= 5)
        result.push('сухе, ');
    else if (sticker.sugar > 5 && sticker.sugar < 30)
        result.push('напівсухе, ');
    else if (sticker.sugar > 30 && sticker.sugar < 80)
        result.push('напівсолодке, ');
    else if (sticker.sugar > 30 && sticker.sugar < 80)
        result.push('солодке, ');

    result.push(`${sticker.color.toLowerCase()} `);
    result.push(`${sticker.stickerTitle}.`);
    return result.join('')

}

export function getOrigin(sticker) {
    const result = [];
    result.push(`Країна походження: ${sticker.country}. `);
    if (sticker.region) {
        result.push(`Регіон: ${sticker.region}`);
        if (sticker.appellation)
            result.push(`, ${sticker.appellation}. `);
        else
            result.push('. ')
    }
    const grapes = sticker.selectedGrapes.join(', ');

    if (sticker.selectedGrapes.length === 1)
        result.push(`Сорт винограду: ${sticker.selectedGrapes}. `);
    else
        result.push(`Сорти винограду: ${grapes}. `);

    result.push(`Рекомендована температура сервірування від +${sticker.servingTemperature}°С до +${Number(sticker.servingTemperature)+2}°С.`);


    return result.join('');
}