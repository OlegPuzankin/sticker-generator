export default function validateEditDB(values) {
    //debugger
    let errors = {};

    if(!values.grape){
        errors.grape='empty field'
    }


    return errors;

}


