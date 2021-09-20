import React from "react";
import logo from "../../assets/svg/logo/logo-264A75.svg";
import { useRef } from "react";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import { useDimensions } from "../mobile-navigation/use-dimensions";
import { useHistory } from "react-router-dom";
import { MenuToggle } from "../mobile-navigation/menu-toggle";
import { Navigation } from "../mobile-navigation/navigation";
import { useSelector, useDispatch } from "react-redux"
import { actions } from "../../store"
import LoginRegister from "./login-register"

const sidebar = {
    open: (height = 1000) => ({
      clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
      transition: {
        type: "spring",
        stiffness: 20,
        restDelta: 2
      }
    }),
    closed: {
      clipPath: "circle(30px at 40px 40px)",
      transition: {
        delay: 0.5,
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
};

export default function MainLayout(props) {
    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    let history = useHistory()
    const selectedLanguage = useSelector(state => state.language.language)
    const token = useSelector(state => state.user.token)
    const dispatch = useDispatch()
    return (
        <div className="w-screen min-h-screen overflow-x-hidden bg-primary">
            <div className="w-full min-h-screen overflow-x-hidden relative">
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
                <div className="opacity-40 w-full h-full absolute top-0 left-0 z-0"/>
                <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    custom={height}
                    ref={containerRef}
                    className={`fixed top-0 left-0 bottom-0 ${isOpen ? "z-30": "h-0 z-20"}`}
                    style={{width: isOpen ? 300 : 0}}
                >
                    <motion.div className="bg-white h-screen" style={{width: 300}} variants={sidebar} >
                        <MenuToggle toggle={() => toggleOpen()} />
                        <Navigation />
                    </motion.div>
                </motion.nav>
                <div className="bg-primary w-full h-28 fixed top-0 left-0 z-10">
                    <div className="bg-food-style h-full w-full flex px-10 justify-between items-center">
                        <div className="h-full flex items-center">
                            <img className="ml-4 h-3/4 cursor-pointer" onClick={() => history.push("/")} src={logo} alt="logo" />
                        </div>
                        
                        <div className="flex items-center">
                            <select value={selectedLanguage} onChange={(e) => dispatch(actions.language.setLanguage(e.target.value))} 
                                className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black text-sm mr-4">
                                <option value="english" key="english">English</option>
                                <option value="sinhala" key="sinhala">සිංහල</option>
                                <option value="tamil" key="tamil">தமிழ்</option>
                            </select>
                            {
                                token ?
                                <LoginRegister className="mr-4" /> :
                                <button onClick={() => history.push("/auth/login")} className="hidden sm:block rounded-lg px-2 py-2 bg-cardColor shadow text-black">
                                Login | Register</button>
                            }
                        </div>
                    </div>
                </div>

                <div className="w-full mt-28 bg-white rounded-t-3xl lg:rounded-t-6xl"
                     style={{minHeight: 'calc(100vh - 7rem)'}}>
                    {props.children}
                </div>

            </div>
        </div>
    )
}