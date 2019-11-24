import React from 'react';
import FirebaseContext from "../../firebase/FirebaseContext";

export const ForgotPassword = (props) => {
    const [resetPassword, setResetPassword] = React.useState('')
    const [isPasswordReset, setIsPasswordReset] = React.useState(false)
    const [resetPasswordError, setResetPasswordError] = React.useState('')


    const {firebase}=React.useContext(FirebaseContext)


    function changeHandler(e) {
        setResetPassword(e.target.value)
    }
    async function handleResetPassword() {
        debugger

            try {
                await firebase.resetPassword(resetPassword);
                setIsPasswordReset(true);
                setResetPasswordError(null);
            }
            catch (error){
                console.log(error.message);
                setResetPasswordError(error.message)
            }

        }


    return (
        <div className='pt-5'>
            <div className='flex flex-column flex-grow-1 w-25 justify-content-center m-auto card bg-info p-4'>
                    <div >
                        <input type='email'
                               value={resetPassword}
                               className='form-control'
                               onChange={changeHandler}
                               placeholder={'Enter valid e-mail to reset password'}/>

                    </div>

                    <div className=' mt-4 text-center'>
                        <button onChange={handleResetPassword} onClick={handleResetPassword} className='btn btn-primary'>Reset password</button>
                    </div>

                {isPasswordReset && <p className='text-danger mt-4'>Check e-mail</p>}
                {resetPasswordError && <p className='text-warning mt-4'>{resetPasswordError}</p>}
            </div>

        </div>


    );
};