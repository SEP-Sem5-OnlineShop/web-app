import React, { useState, useEffect } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../store"
import SideNavigation from "../mobile-navigation"
import LoginRegister from "./login-register"
import {IconContext} from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";

import logo from "../../assets/svg/logo/logo-264A75.svg";
import CustomerMap from "../../geo-location/index-map";
import Toggle from "../../components/ThemeToggle";

export default function MainLayout(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    let history = useHistory()
    const selectedLanguage = useSelector(state => state.language.language)
    const showMap = useSelector(state => state.map.showMap)
    const role = useSelector(state => state.user.userData.role)
    const [isMobile, setIsMobile] = useState(false)
    const isLogin = useSelector(state => state.user.isLogin)
    const dispatch = useDispatch()



    useEffect(() => {
        function verifyScreen() {
            if (window.innerWidth < 976) {
                setIsMobile(true)
            }
            else {
                setIsMobile(false)
            }
        }
        verifyScreen()
        window.addEventListener("resize", verifyScreen)
        return () => {
            window.removeEventListener("resize", verifyScreen)
        }
    }, [])

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
                    <div className={`bg-food-style h-full w-full flex px-2 xs:px-6 sm:px-10 justify-end sm:justify-between items-center`}>
                        <div className="hidden sm:flex h-full items-center">
                            <img className="ml-4 h-4/6 md:h-3/4 cursor-pointer" onClick={() => history.push("/")} src={logo} alt="logo" />
                        </div>

                        {/* <div className="sm:w-full md:w-3/4 lg:w-1/2">
                            <input className="bg-o p-2 rounded-lg w-full outline-none" 
                            placeholder={dashboardStrings.searchBox} />
                        </div> */}
                        
                        <div className="flex items-center">

                            {
                                isLogin === "yes" && role === "customer" ?
                                    <IconContext.Provider value={{ color: "#264A75", size: "2rem"}} >
                                        <div className="mr-2 cursor-pointer" onClick={() => dispatch(actions.map.setLanguage(!showMap))}>
                                            <FaMapMarkerAlt />
                                        </div>
                                    </IconContext.Provider>
                                    : null
                            }

                            <select value={selectedLanguage} onChange={(e) => dispatch(actions.language.setLanguage(e.target.value))}
                                className="rounded-lg xs:px-1 sm:px-2 py-2 bg-cardColor shadow text-black text-xs md:text-sm mr-2 xs:mr-3 md:mr-4 dark:bg-secondary dark:text-white">
                                <option value="english" key="english">English</option>
                                <option value="sinhala" key="sinhala">සිංහල</option>
                                <option value="tamil" key="tamil">தமிழ்</option>
                            </select>
                            {
                                isLogin === "yes" ?
                                    <LoginRegister className="mr-4" freeze={!isMobile} /> :
                                    <button data-testid={'login-register-button'} onClick={() => history.push("/auth/login")} className="hidden sm:block rounded-lg xs:px-1 sm:px-2 py-2 bg-cardColor shadow text-black dark:bg-secondary dark:text-white">
                                        Login | Register</button>
                            }
                            <Toggle/>
                        </div>
                    </div>
                </div>

                <div className="w-full mt-28 bg-white rounded-t-3xl lg:rounded-t-6xl dark:bg-secondary"
                    style={{ minHeight: 'calc(100vh - 7rem)' }}>
                    {
                        isLogin === "yes" && showMap && role === "customer" ?
                            <CustomerMap />
                            :
                            props.children
                    }
                </div>

            </div>
        </div>
    )
}