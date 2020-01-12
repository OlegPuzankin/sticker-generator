export function getTitle(sticker) {
    const result = [];
    if (sticker.regionControl === 'PJI') {
        result.push('Вино із захищеною географічною ознакою, ')
    } else if (sticker.regionControl==='PDO'){
        result.push('Вино із захищеним найменуванням за походженням, ')
    } else
        result.push('Вино виноградне, ')

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
    else if (sticker.sugar >= 80)
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
    // const grapes=sticker.selectedGrapes.map(g=>g.toLowerCase())
    // const grapesResult = grapes.join(', ');
    // debugger

    if (sticker.selectedGrapes.length === 1)
        result.push(`Сорт винограду: ${sticker.selectedGrapes.join(', ')}. `);
    else
        result.push(`Сорти винограду: ${sticker.selectedGrapes.join(', ')}. `);

    result.push(`Рекомендована температура сервірування від +${sticker.servingTemperature}°С до +${Number(sticker.servingTemperature)+2}°С.`);


    return result.join('');
}

export function getShelfLifetime(shelfLifetime) {
    if(Number(shelfLifetime)===1)
        return `1 рік`;
    else if (Number(shelfLifetime)>=5)
        return `${shelfLifetime} років`;
    else
        return `${shelfLifetime} роки`
}
