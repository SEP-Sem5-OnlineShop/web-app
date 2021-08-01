import React from "react";
import {motion} from "framer-motion";

export default function CardTemplate(props) {
    return (
        <motion.div layout className="w-full bg-cardColor rounded-xl shadow-sm mt-12 p-6">
            {props.children}
        </motion.div>
    )
}