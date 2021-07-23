import React from "react"
import {useFormik} from 'formik';
import {useDispatch} from 'react-redux';
import {thunks} from "../../store"
import * as Yup from 'yup';

import logo from '../../assets/svg/logo/logo-big.svg'
import sideDesign from '../../assets/svg/fixes/edge-corner.svg'
import googleLogo from '../../assets/svg/icons/google.svg'
import facebookLogo from '../../assets/svg/icons/facebook.svg'
import InputWithValidation from "../../components/input-with-next-button";
import {motion} from "framer-motion"

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
            <motion.div animate={{x: 0}} transition={{duration: 1}}
                        className="w-5/12 lg:w-7/12 h-full justify-center align-center hidden lg:flex">
                <img className="w-4/5 lg:w-3/5" src={logo} alt="logo big"/>
            </motion.div>
            <div className="w-full lg:w-7/12 lg:w-5/12 h-full
                            bg-primary
                            relative">
                <div className="w-full h-full
                                bg-food-style bg-cover bg-cover bg-center
                                flex flex-col justify-between md:items-center md:justify-center">

                    {/*heading text is here*/}
                    <div className="
                    flex flex-col align-center
                    w-full" style={{minHeight: 100}}>
                        <div className="flex justify-center text-3xl md:text-6xl font-bold text-secondary mt-4">Login
                        </div>
                        <div className="flex justify-center text-xl font-medium text-secondary mt-2">Access Your
                            Account
                        </div>
                    </div>

                    <div className="
                    w-full md:w-3/4 xl:w-1/2 h-3/4 md:h-auto
                    pt-8 sm:py-8 sm:p-4 mt-8
                    flex flex-col items-center justify-center
                    bg-accent relative
                    rounded-tl-3.5xl md:rounded-2xl" style={{minHeight: 520}}>

                        <div className="absolute md:hidden right-0" style={{top: '-49px'}}>
                            <img src={sideDesign} alt='sideDesign'/>
                        </div>

                        <div className="w-3/4 mb-10 md:hidden">
                            <img src={logo} alt="logo" />
                        </div>

                        <form onSubmit={formik.handleSubmit} className="w-full">
                            <InputWithValidation
                                label='Telephone Number'
                                id='telephone'
                                name='telephone'
                                type='text'
                                formik={formik}
                                className='mb-4'
                            />
                            {/*<InputWithValidation*/}
                            {/*    label='Password'*/}
                            {/*    id='password'*/}
                            {/*    name='password'*/}
                            {/*    type='password'*/}
                            {/*    formik={formik}*/}
                            {/*/>*/}
                            {/*<button type="submit" className="*/}
                            {/*w-full*/}
                            {/*p-4 mt-2*/}
                            {/*rounded-xl*/}
                            {/*bg-primary*/}
                            {/*text-secondary font-bold text-xl md:text-base">Sign In*/}
                            {/*</button>*/}
                        </form>

                        <div className="text-sm text-text flex justify-center mt-0 md:mt-5">Or Login with Email</div>

                        {/*google and facebook login buttons*/}
                        <div className="flex justify-center mt-3">
                            <button className="rounded-xl w-14 h-14 flex justify-center items-center p-1 bg-white">
                                <img width={32} src={googleLogo} alt="google-logo"/>
                            </button>
                            <button className="rounded-xl w-14 h-14 ml-5 flex justify-center items-center p-1 bg-white">
                                <img width={14} src={facebookLogo} alt="google-logo"/>
                            </button>
                        </div>

                        <div className="mt-4">
                            <div className="flex justify-center">
                                <span className="text-secondary text-xs xxs:text-sm xs:text-base">Don’t have an account?</span>
                                <span className="text-secondary font-semibold text-xs xxs:text-sm xs:text-base ml-2">Register</span>
                            </div>
                            <div className="flex justify-center">
                                <span className="text-secondary text-xs xxs:text-sm xs:text-base">Forgot password?</span>
                                <span className="text-secondary font-semibold text-xs xxs:text-sm xs:text-base ml-2">Change password</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}