import React, {useEffect, useState} from "react"
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { actions } from "../../store"
import {MdNotifications} from "react-icons/md"
import {MdNotificationsActive} from "react-icons/md"

import SideNavigation from "../mobile-navigation"
import LoginRegister from "../home-layout/login-register"
import {FaBell} from "react-icons/fa";
import {IconContext} from "react-icons";


export default function DashboardLayout(props) {
    const [isOpen, setIsOpen] = useState(true);
    let history = useHistory()
    const dispatch = useDispatch()
    const selectedLanguage = useSelector(state => state.language.language)
    const isLogin = useSelector(state => state.user.isLogin)
    const token = useSelector(state => state.user.token)

    // const variants = {
    //     open: { width: 'calc(100% - 300px)', left: '300px' },
    //     closed: { width: '100%', left: '0' },
    // }

    useEffect(() => {
        function toggleSideNav() {
            if (window.innerWidth < 976) {
                setIsOpen(false)
            }
            else {
                setIsOpen(true)
            }
        }
        window.addEventListener("resize", toggleSideNav)
        return () => {
            window.removeEventListener("resize", toggleSideNav)
        }
    }, [])

    return (
        <React.Fragment>
            <div className="w-screen min-h-screen overflow-x-hidden">
                <div className="w-full min-h-screen overflow-x-hidden bg-contain bg-center relative">
                    <SideNavigation noToggle={true} freeze={true} isOpen={isOpen} toggleOpen={setIsOpen} />
                    {/* <div className="bg-food-style opacity-40 w-full h-full absolute top-0 left-0 z-0" /> */}
                    <div className="h-20 bg-white fixed flex px-10 top-0 lg:top-0
                    justify-between items-center z-10 w-mobile lg:w-desktop inset-0 lg:inset-300">
                        <select value={selectedLanguage} onChange={(e) => dispatch(actions.language.setLanguage(e.target.value))}
                                className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black text-sm mr-4">
                            <option value="english" key="english">English</option>
                            <option value="sinhala" key="sinhala">සිංහල</option>
                            <option value="tamil" key="tamil">தமிழ்</option>
                        </select>

                        <div className="flex items-center">
                            {
                                isLogin === "yes" ?
                                    <LoginRegister className="mr-4" /> :
                                    <button onClick={() => history.push("/auth/login")} className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black">
                                        Login | Register</button>
                            }
                        </div>
                    </div>

                    <div className="bg-white relative p-8"
                        style={{ minHeight: 'calc(100vh - 80px)', marginTop: '80px', width: 'calc(100% - 300px)',
                        marginLeft: '300px'}}>
                        {props.children}
                    </div>

                </div>
            </div>
        </React.Fragment>
    )
}