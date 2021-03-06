import React from 'react';
import {getOrigin, getShelfLifetime, getTitle} from "../../functions/sticker-output-utils";
import format from 'date-fns/format'



export const StickerOutput = ({sticker}) => {
    const title = getTitle(sticker);
    const origin = getOrigin(sticker);
    const bottlingDate = format (new Date (sticker.bottlingYear), 'dd.MM.yyyy');


    return (
        <div className='card d-flex flex-column p-2 mb-2'>
            <h2 className='text-center mb-2'>
                {sticker.originalTitle}
            </h2>

            <div className='d-flex flex-column border border-dark p-2'>
                <h4 className='text-center'>{title}</h4>

                <div>{origin} </div>

                <div>
                    Гарантійний термін зберігання {getShelfLifetime(sticker.shelfLifetime)}. Якщо після закінчення гарантійного терміну зберігання,
                    не з’явились помутніння чи видимий осад, вино придатне для подальшого зберігання та реалізації.
                    Зберігати в затемнених приміщеннях за температури від +5˚С до +20˚С. Без додавання спирту, цукру,
                    без додавання концентратів. Містить <b>cульфіти.</b>{sticker.sugar>4&&` Вміст цукру: ${sticker.sugar/10} mass.(% мас.)`}
                </div>

                <div>
                    <b>Виробник: </b>
                    {sticker.producerFullData}
                </div>

                <div>
                    <b>Імпортер: </b>
                    ТОВ «СІЛЬПО-ФУД» вул. Бутлерова 1, м. Київ, 02090, Україна, тел.: +38 044 496 32 55.
                </div>

                <div>
                    <b>
                        Заборонено вживати дітям віком до 18 років, вагітним жінкам, особам, які мають медичні чи
                        професійні
                        протипоказання до вживання алкогольних напоїв.
                    </b>
                </div>

                <div>
                    Дата виготовлення (розливу)/Bottling date: {bottlingDate}
                </div>

                <div>
                    Номер партії/Lot number: {sticker.lotNumber}
                </div>

                <div>
                    Місткіть: <b>{sticker.volume/1000} л(L)</b>
                </div>
                <div>
                    Вміст спирту: <b>{sticker.alcohol} об. (% vol.)</b>
                </div>
            </div>

            <br/>


        </div>


    );
};