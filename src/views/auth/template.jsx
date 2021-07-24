import React from "react"

import logo from '../../assets/svg/logo/logo-big.svg'
import sideDesign from '../../assets/svg/fixes/edge-corner.svg'
import googleLogo from '../../assets/svg/icons/google.svg'
import facebookLogo from '../../assets/svg/icons/facebook.svg'

export default function AuthTemplate(props) {

    return (
        <div className="w-screen min-h-screen md:h-screen flex">

            <div className="w-5/12 lg:w-7/12 h-full justify-center align-center hidden lg:flex">
                <img className="w-4/5 lg:w-3/5" src={logo} alt="logo big"/>
            </div>

            <div className="w-full lg:w-7/12 lg:w-5/12 min-h-screen
                            bg-primary
                            relative">
                <div className="w-full h-full
                                bg-food-style bg-cover bg-cover bg-center
                                flex flex-col justify-between md:items-center md:justify-center">

                    {/*heading text is here*/}
                    <div className="
                    flex flex-col align-center
                    w-full min-h-100 md:min-h-0">
                        <div className="flex justify-center text-3xl md:text-6xl font-bold text-secondary mt-4">Login
                        </div>
                        <div className="flex justify-center text-xl font-medium text-secondary mt-2">Access Your
                            Account
                        </div>
                    </div>

                    <div className="
                    w-full md:w-3/4 xl:w-1/2 h-auto min-h-4/5
                    py-8 sm:p-4 mt-8
                    flex flex-col items-center justify-center
                    bg-accent
                    rounded-tl-3.5xl md:rounded-2xl md:min-h-0">

                        <div className="absolute md:hidden right-0" style={{top: '-49px'}}>
                            <img src={sideDesign} alt='sideDesign'/>
                        </div>

                        {
                            props.withImage ?
                                <div className="w-3/4 mb-10 md:hidden">
                                    <img src={logo} alt="logo"/>
                                </div> :
                                null
                        }

                        <div className="flex justify-center items-center w-full relative">
                            {props.children}
                        </div>

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
                                <span
                                    className="text-secondary text-xs xxs:text-sm xs:text-base">{props.bottomText1 || 'Don’t have an account?'}</span>
                                <span
                                    className="text-secondary font-semibold text-xs xxs:text-sm xs:text-base ml-2">{props.bottomText2 || 'Register'}</span>
                            </div>
                            {
                                props.login ?
                                    <div className="flex justify-center">
                                        <span className="text-secondary text-xs xxs:text-sm xs:text-base">Forgot password?</span>
                                        <span
                                            className="text-secondary font-semibold text-xs xxs:text-sm xs:text-base ml-2">Change password</span>
                                    </div> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}