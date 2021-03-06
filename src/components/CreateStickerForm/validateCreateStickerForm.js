export default function validateCreateStickerForm(values) {
    //debugger
    let errors = {};
////////////////////original title///////////////////////
    if(!values.originalTitle){
        errors.originalTitle='empty field'
    }
    ////////////////////sticker title///////////////////////
    if(!values.stickerTitle){
        errors.stickerTitle='empty field'
    }
////////////////////producer///////////////////////
    if (!values.producer){
        errors.producer='empty producer field'
    }
    else if(/^Select/.test(values.producer)){
        errors.producer='Select producer field'
    }
    ////////////////////wines color///////////////////////
    if (!values.color){
        errors.color='empty color field'
    }
    else if(/^Select/.test(values.color)){
        errors.color='Select color'
    }
    ////////////////////region control///////////////////////
    if (!values.regionControl){
        errors.regionControl='empty region control field'
    }
    else if(/^Select/.test(values.regionControl)){
        errors.regionControl='Select region control'
    }
////////////////////country///////////////////////
    if (!values.country){
        errors.country='empty country field'
    }
    else if(/^Select/.test(values.country)){
        errors.country='Select country field'
    }

    ////////////////////harvest year///////////////////////
    if (!values.harvestYear){
        errors.harvestYear='empty harvest year field'
    }
    else if(/^Select/.test(values.harvestYear)){
        errors.harvestYear='Select harvest year field'
    }
    ////////////////////bottling year///////////////////////
    if (!values.bottlingYear){
        errors.bottlingYear='empty bottling year field'
    }
    else if(/^Select/.test(values.bottlingYear)){
        errors.bottlingYear='Select bottling year field'
    }
////////////////////selected grapes///////////////////////

    if(values.selectedGrapes.length===0){
        errors.selectedGrapes='none selected'
    }


    return errors;

}


