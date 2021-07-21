import React from "react"
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { thunks } from "../../store"
import * as Yup from 'yup';

import logo from '../../assets/svg/logo/logo-big.svg'
import googleLogo from '../../assets/svg/icons/google.svg'
import facebookLogo from '../../assets/svg/icons/facebook.svg'
import InputWithValidation from "../../components/input-with-validation";

export default function Login() {

    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            telephone: '',
            password: '',
        },
        validationSchema: Yup.object({
            telephone: Yup.string()
                .required('Required')
                .matches('^(?:0|94|\\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\\d)\\d{6}$',
                    'Telephone number did not matched with requirements!'),
            password: Yup.string()
                .required('Required')
        }),
        onSubmit: async values => {
            await dispatch(thunks.user.localSignIn(values.telephone, values.password))
        },
    });

    return (
        <div className="w-screen h-screen flex">
            <div className="w-7/12 h-full flex justify-center align-center">
                <img className="w-3/5" src={logo} alt="logo big" />
            </div>
            <div className="w-5/12 h-full bg-primary">
                <div className="w-full h-full bg-food-style bg-cover
                bg-center flex flex-col items-center justify-center">

                    <div className="flex flex-col align-center">
                        <div className="flex justify-center text-5xl font-bold">USER</div>
                        <div className="flex justify-center text-6xl font-bold mt-4">LOGIN</div>
                    </div>

                    <div className="w-2/3 p-8 flex flex-col items-center bg-accent mt-8 rounded-2xl" >

                        {/*google and facebook login buttons*/}
                        <div className="flex justify-center">
                            <button className="rounded-xl w-16 h-16 flex justify-center items-center p-1 bg-white">
                                <img width={32} src={googleLogo} alt="google-logo" />
                            </button>
                            <button className="rounded-xl w-16 h-16 ml-5 flex justify-center items-center p-1 bg-white">
                                <img width={14} src={facebookLogo} alt="google-logo" />
                            </button>
                        </div>
                        <div className="text-base text-text flex justify-center mt-5">Or Login with Email</div>

                        <form onSubmit={formik.handleSubmit} className="w-3/4">
                            <InputWithValidation
                                label='Telephone Number'
                                id='telephone'
                                name='telephone'
                                type='text'
                                formik={formik}
                            />
                            <InputWithValidation
                                label='Password'
                                id='password'
                                name='password'
                                type='password'
                                formik={formik}
                            />
                            <button type="submit" className="w-full p-4 mt-2 rounded-xl bg-primary text-black font-bold">Register</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}