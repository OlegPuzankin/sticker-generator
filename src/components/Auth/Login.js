import React from 'react';
import {Input} from "../../UI/Input";
import useFormValidation from "./useFormValidation";
import validateLogin from "./validateLogin";
import {FirebaseContext} from "../../firebase";


const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
};


export const Login = (props) => {


    const [login, setLogin] = React.useState(true);
    const [loginError, setLoginError] = React.useState(null);
    const {firebase, user}=React.useContext(FirebaseContext);
    debugger

    const {changeHandler, submitHandler, handleBlur, values, errors, isSubmitting} =
        useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);


    async function authenticateUser() {

        const {name, email, password} = values;
        try {
            login
                ? await firebase.login(email, password)
                : await firebase.register(name, email, password);
            props.history.push('/create')
        } catch (error) {
            setLoginError(error.message)
        }
    }

    //const [loginError, setLoginError] = React.useState(null);

    console.log('values', values);
    console.log('errors', errors);
    console.log('user', user);


    return (
        <form className='mt-5' onSubmit={submitHandler}>
            <div className='row justify-content-center'>
                <div className='col-5 bg-primary rounded p-4'>

                    {!login && (
                        <Input type={'text'}
                               name={'name'}
                               changeHandler={changeHandler}
                               handleBlur={handleBlur}
                               value={values.name}
                               errors={errors}
                               label={'Enter your name'}
                               placeholder={'Enter your name'}
                               htmlFor={'inputName'}/>)
                    }


                    <Input type={'email'}
                           name={'email'}
                           changeHandler={changeHandler}
                           handleBlur={handleBlur}
                           value={values.email}
                           errors={errors}
                           label={'Email address'}
                           placeholder={'Enter email'}
                           htmlFor={'inputEmail'}/>

                    <Input type={'password'}
                           name={'password'}
                           changeHandler={changeHandler}
                           handleBlur={handleBlur}
                           value={values.password}
                           errors={errors}
                           label={'Password'}
                           placeholder={'Password'}
                           htmlFor={'input Password'}/>

                    {loginError && <p className='text-danger'>{loginError}</p>}

                    <div  className='row justify-content-between pl-3 pr-3'>
                        <button type="submit"
                                disabled={!(Object.keys(errors).length === 0) || isSubmitting}
                                className="btn btn-light">Submit</button>

                        <button type="button"
                                className="btn btn-danger"
                                onClick={() => setLogin(prevLogin => !prevLogin)}>
                            {login ? "need to create an account?" : "already have an account?"}
                        </button>
                    </div>


                </div>
            </div>
        </form>
    );
};