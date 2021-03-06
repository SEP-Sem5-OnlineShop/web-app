import React from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../store"
import SideNavigation from "../mobile-navigation"
import LoginRegister from "./login-register"

import logo from "../../assets/svg/logo/logo-264A75.svg";

export default function MainLayout(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    let history = useHistory()
    const selectedLanguage = useSelector(state => state.language.language)
    const dashboardStrings = useSelector(state => state.language.languageFile.dashboard)
    const isLogin = useSelector(state => state.user.isLogin)
    const dispatch = useDispatch()
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden relative">
                <AnimatePresence>
                    {
                        isOpen &&
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            exit={{ opacity: 0 }}
                            onClick={() => toggleOpen()}
                            className="fixed top-0 left-0 bg-black w-full h-screen z-20"
                        />
                    }
                </AnimatePresence>
                <SideNavigation isOpen={isOpen} toggleOpen={toggleOpen} />
                <div className="bg-primary w-full h-28 fixed top-0 left-0 z-10">
                    <div className="bg-food-style h-full w-full flex px-10 justify-between items-center">
                        <div className="h-full flex items-center">
                            <img className="ml-4 h-3/4 cursor-pointer" onClick={() => history.push("/")} src={logo} alt="logo" />
                        </div>

                        <div className="sm:w-full md:w-3/4 lg:w-1/2">
                            <input className="bg-o p-2 rounded-lg w-full outline-none" 
                            placeholder={dashboardStrings.searchBox} />
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
                </div>

                <div className="w-full mt-28 bg-white rounded-t-3xl lg:rounded-t-6xl"
                    style={{ minHeight: 'calc(100vh - 7rem)' }}>
                    {props.children}
                </div>

            </div>
        </div>
    )
}