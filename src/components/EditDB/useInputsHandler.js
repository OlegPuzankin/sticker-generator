import React from "react";


function useInputsHandler(initialState) {
    const [values, setValues] = React.useState(initialState);

    const changeHandler = (e) => {
        //debugger
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

    // const handleBlur = () => {
    //     //debugger
    //     const validateErrors = validate(values);
    //     setErrors(validateErrors);
    // };



    return {changeHandler, changeHandlerMultipleSelectHandler, setValues, values}

}


export default useInputsHandler;
