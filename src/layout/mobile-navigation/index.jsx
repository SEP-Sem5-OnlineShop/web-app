import React from "react"
import { motion } from "framer-motion";
import { useRef } from "react";
import { useDimensions } from "./use-dimensions";

import { MenuToggle } from "./menu-toggle";
import { Navigation } from "./navigation";

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

export default function SideNavigation(props) {
    const containerRef = useRef(null);
    const { height } = useDimensions(containerRef);
    return (
        <motion.nav
            initial={false}
            animate={props.isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={`fixed top-0 left-0 bottom-0 ${props.isOpen ? "z-30": "h-0 z-20"}`}
            style={{width: props.isOpen ? 300 : 0}}
        >
            <motion.div className={`${props.freeze ? "bg-textLight" : "bg-white dark:bg-secondary"} h-screen`} style={{width: 300}}
                        variants={sidebar} >
                {props.noToggle ? null : <MenuToggle freeze={props.freeze} toggle={() => props.toggleOpen(!props.isOpen)}/>}
                <Navigation freeze={props.freeze} />
            </motion.div>
        </motion.nav>
    )
}