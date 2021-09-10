import React from "react"

import logo from '../../assets/svg/logo/logo-264A75.svg'
import sideDesign from '../../assets/svg/fixes/edge-corner.svg'
import googleLogo from '../../assets/svg/icons/google.svg'
import facebookLogo from '../../assets/svg/icons/facebook.svg'
import streetFood from '../../assets/svg/designs/street-food.svg'
import donuts from '../../assets/svg/designs/donut-love.svg'

export default function AuthTemplate(props) {

    return (
        <div className="w-screen min-h-screen overflow-x-hidden flex">

            <div className="xl:w-7/12 min-h-screen h-full justify-center items-center hidden xl:flex flex-col relative">
                {/*<img className="w-1/2 mb-6 opacity-50 z-index-0 bottom-16" src={streetFood} alt="donut love" />*/}
                <img className="w-4/5 lg:w-3/5 relative z-index-10" src={logo} alt="logo big"/>
            </div>

            <div className="w-full overflow-x-hidden xl:w-5/12 min-h-screen
                            bg-primary
                            relative">
                <div className="w-full h-full overflow-x-hidden
                                bg-food-style bg-cover bg-cover bg-center
                                flex flex-col justify-between md:items-center md:justify-center">

                    {/*heading text is here*/}
                    <div className="
                    flex flex-col align-center
                    w-full min-h-100 md:min-h-0">
                        <div className="flex justify-center text-3xl md:text-6xl font-bold text-secondary mt-4">{props.upperText1}
                        </div>
                        <div className="flex justify-center text-xl font-medium text-secondary mt-2">{props.upperText2}
                        </div>
                    </div>

                    <div className="
                    w-full md:w-1/2 h-auto min-h-4/5
                    py-8 sm:p-4 mt-8 md:mb-8
                    flex flex-col items-center justify-center
                    bg-accent
                    rounded-tl-3.5xl md:rounded-2xl md:min-h-0
                    relative">

                        <div className='absolute bottom-0 z-index-0'>
                            <img className='opacity-10' src={donuts} alt='donuts-love' />
                        </div>

                        <div className="absolute md:hidden right-0" style={{top: '-49px'}}>
                            <img src={sideDesign} alt='sideDesign'/>
                        </div>

                        {
                            props.withImage ?
                                <div className="w-3/4 mb-10 max-w-280 md:hidden">
                                    <img src={logo} alt="logo"/>
                                </div> :
                                null
                        }

                        <div className="flex justify-center items-center w-full relative">
                            {props.children}
                        </div>

                        <div className="text-sm mt-4 text-text flex justify-center mt-0 md:mt-5 relative z-index-10">Or Login with Email</div>

                        {/*google and facebook login buttons*/}
                        <div className="flex justify-center mt-3 relative z-index-10">
                            <button className="rounded-xl w-14 h-14 flex justify-center items-center p-1 bg-white ">
                                <img width={32} src={googleLogo} alt="google-logo"/>
                            </button>
                            <button className="rounded-xl w-14 h-14 ml-5 flex justify-center items-center p-1 bg-white">
                                <img width={14} src={facebookLogo} alt="google-logo"/>
                            </button>
                        </div>

                        <div className="mt-4 relative z-index-10">
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