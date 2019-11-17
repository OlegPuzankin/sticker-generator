export default function validateCreateStickerForm(values) {
    //debugger
    let errors = {};

    if(!values.wineName){
        errors.wineName='empty wine\'s name field'
    }

    if(!values.alcohol){
        errors.alcohol='empty test field'
    }

    return errors;

}
