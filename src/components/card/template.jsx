import React from "react";
import {motion} from "framer-motion";

export default function CardTemplate(props) {
    const comProps = {
        className: props.className || ""
    }
    return (
        <motion.div layout className={`w-full bg-cardColor rounded-xl shadow-sm mt-12 
        p-2 lg:p-6 ${comProps.className}`} style={{overflowX: "auto"}}>
            {props.children}
        </motion.div>
    )
}