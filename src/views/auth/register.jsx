import React from "react"
import logo from '../../assets/svg/logo/logo-big.svg'
import googleLogo from '../../assets/svg/icons/google.svg'
import facebookLogo from '../../assets/svg/icons/facebook.svg'

export default function Register() {
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
                        <div className="flex justify-center text-6xl font-bold mt-4">REGISTER</div>
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

                        <form className="w-3/4">
                            <div className="mb-2">
                                <label>First Name</label>
                                <input className="rounded-xl mt-1 p-2 w-full" />
                            </div>
                            <div className="mb-2">
                                <label>Last Name</label>
                                <input className="rounded-xl mt-1 p-2 w-full" />
                            </div>
                            <div className="mb-2">
                                <label>Password</label>
                                <input className="rounded-xl mt-1 p-2 w-full" />
                            </div>
                            <div className="mb-2">
                                <label>Confirm Password</label>
                                <input className="rounded-xl mt-1 p-2 w-full" />
                            </div>
                            <button className="w-full p-4 mt-2 rounded-xl bg-primary text-black font-bold">Register</button>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    )
}