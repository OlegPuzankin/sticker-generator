import React from "react";
import {hideAlert, showAlert} from "../../redux/actions/alertActions";


function useFormValidationStickerForm(initialState, validate, submit, dispatch) {
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isTriedSubmit, setIsTriedSubmit] = React.useState(false);
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    React.useEffect(() => {
        //debugger
        if (isSubmitting) {
            const noErrors = (Object.keys(errors).length === 0);
            if (noErrors) {
                //debugger
                submit();
                setIsSubmitting(false);
            } else {

                dispatch(showAlert('Please check all fields', 'danger'));
                //setToggle(true);
                setTimeout(() => {
                   //setToggle(false);
                    dispatch(hideAlert())
                 }, 4500);
                setIsSubmitting(false);
            }
        }
    }, [errors]);

    const changeHandler = (e) => {

        setValues({
            ...values,
            [e.target.name]: e.target.value
        })
    };

    const changeHandlerMultipleSelectHandler = (name, result) => {
        //debugger
        setValues({
            ...values,
            [name]: result
        })


    };

    const handleBlur = () => {
        //debugger
        const validateErrors = validate(values);
        setErrors(validateErrors);
    };

    const submitHandler = (e) => {
        // debugger
        e.preventDefault();
        e.persist();
        const validateErrors = validate(values);
        setIsTriedSubmit(true)
        setErrors(validateErrors);
        setIsSubmitting(true);
    };

    return {
        changeHandler,
        changeHandlerMultipleSelectHandler,
        submitHandler,
        handleBlur,
        setIsTriedSubmit,
        setValues,
        values,
        errors,
        isSubmitting,
        isTriedSubmit
    }

}


export default useFormValidationStickerForm;
