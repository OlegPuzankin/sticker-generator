import React from "react";


function useFormValidation(initialState, validate, submit) {
    const [values, setValues] = React.useState(initialState);
    const [errors, setErrors] = React.useState({});
    const [isSubmitting, setIsSubmitting] = React.useState(false);


    React.useEffect(() => {
        //debugger
        //console.log('use effect')
        if (isSubmitting) {
            const noErrors = (Object.keys(errors).length === 0);
            if (noErrors) {
                //debugger
                submit();
                setIsSubmitting(false);
            } else
                setIsSubmitting(false);
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
        e.preventDefault();
        e.persist();
        const validateErrors = validate(values);
        setErrors(validateErrors);
        setIsSubmitting(true);
    };

    return {changeHandler, changeHandlerMultipleSelectHandler, submitHandler, handleBlur, setValues, values, errors, isSubmitting}

}


export default useFormValidation;
