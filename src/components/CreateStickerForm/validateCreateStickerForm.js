export default function validateCreateStickerForm(values) {
    debugger
    let errors = {};

    if(!values.originalTitle){
        errors.originalTitle='empty wine\'s name field'
    }

    if(!values.harvestYear){
        errors.harvestYear='empty harvest year'
    }




    if(!values.alcohol){
        errors.alcohol='empty test field'
    }

    return errors;

}
