import React, {useState, useEffect} from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { actions } from "../../store"

import SideNavigation from "../mobile-navigation"
import LoginRegister from "../home-layout/login-register"

import logo from "../../assets/svg/logo/logo-264A75.svg";
import Toggle from "../../components/ThemeToggle";

export default function InnerPageLayout(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    let history = useHistory()
    const dispatch = useDispatch()
    const selectedLanguage = useSelector(state => state.language.language)
    const [isMobile, setIsMobile] = useState(false)
    const isLogin = useSelector(state => state.user.isLogin)

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
                    <div className="h-20 bg-white w-full fixed flex px-2 xs:px-6 sm:px-10 top-0 left-0 justify-end md:justify-between items-center z-10 dark:bg-buttonColor">
                        <div className="hidden md:flex h-full items-center">
                            <img className="cursor-pointer ml-8" style={{height: 80}} onClick={() => history.push("/")} src={logo} alt="logo" />
                        </div>

                        <div className="flex items-center">
                            <select value={selectedLanguage} onChange={(e) => dispatch(actions.language.setLanguage(e.target.value))} 
                                className="rounded-lg xs:px-2 py-2 bg-cardColor shadow text-black text-xs xs:text-sm mr-2 xs:mr-4 dark:text-white dark:bg-secondary">
                                <option value="english" key="english">English</option>
                                <option value="sinhala" key="sinhala">සිංහල</option>
                                <option value="tamil" key="tamil">தமிழ்</option>
                            </select>
                            {
                                isLogin === "yes" ?
                                <LoginRegister className="mr-4" freeze={!isMobile} /> :
                                <button onClick={() => history.push("/auth/login")} className="hidden sm:block rounded-lg xs:px-2 py-2 bg-cardColor shadow text-black dark:text-white dark:bg-secondary">
                                Login | Register</button>
                            }
                            <Toggle/>
                        </div>
                    </div>

                    <div className="w-full bg-white relative p-2 sm:p-8 dark:bg-secondary"
                        style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px' }}>
                        {props.children}
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}