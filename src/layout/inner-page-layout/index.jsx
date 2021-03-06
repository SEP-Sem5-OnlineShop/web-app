import React from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { actions } from "../../store"

import SideNavigation from "../mobile-navigation"
import LoginRegister from "../home-layout/login-register"

import logo from "../../assets/svg/logo/logo-264A75.svg";

export default function InnerPageLayout(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    let history = useHistory()
    const dispatch = useDispatch()
    const selectedLanguage = useSelector(state => state.language.language)
    const isLogin = useSelector(state => state.user.isLogin)
    const token = useSelector(state => state.user.token)
    return (
        <React.Fragment>
            <div className="w-screen min-h-screen overflow-x-hidden">
                <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                    <AnimatePresence>
                        {
                            isOpen &&
                            <motion.div 
                                initial={{opacity: 0}}
                                animate={{opacity: 0.5}}
                                exit={{opacity: 0}}
                                onClick={() => toggleOpen()}
                                className="fixed top-0 left-0 bg-black w-full h-screen z-20" 
                            />
                        }
                    </AnimatePresence>
                    <SideNavigation isOpen={isOpen} toggleOpen={toggleOpen} />
                    {/* <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 z-0" /> */}
                    <div className="h-20 bg-white w-full fixed flex px-10 top-0 left-0 justify-between items-center z-10">
                        <div className="h-full flex items-center">
                            <img className="cursor-pointer ml-8" style={{height: 80}} onClick={() => history.push("/")} src={logo} alt="logo" />
                        </div>    

                        <div className="flex items-center">
                            <select value={selectedLanguage} onChange={(e) => dispatch(actions.language.setLanguage(e.target.value))} 
                                className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black text-sm mr-4">
                                <option value="english" key="english">English</option>
                                <option value="sinhala" key="sinhala">???????????????</option>
                                <option value="tamil" key="tamil">???????????????</option>
                            </select>
                            {
                                isLogin === "yes" ?
                                <LoginRegister className="mr-4" /> :
                                <button onClick={() => history.push("/auth/login")} className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black">
                                Login | Register</button>
                            }
                        </div>
                    </div>

                    <div className="w-full bg-white relative p-8"
                        style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}>
                        {props.children}
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}