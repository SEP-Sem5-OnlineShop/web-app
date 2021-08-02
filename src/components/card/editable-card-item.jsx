import React, {useState} from "react"
import {AnimatePresence, motion} from "framer-motion";
import InputWithValidation from "../input-with-validation";

export default function EditableCardItem(props) {
    const comProps = {
        formik: props.formik || {},
        label: props.label || "",
        fieldValue: props.fieldValue || "",
        id: props.id || "",
        name: props.name || ""
    }
    const [value, setValue] = useState(false)
    return (
        <motion.div className="mb-8">
            <div className="text-text font-medium">{comProps.label}</div>
            <AnimatePresence>
                {
                    !value &&
                        <motion.div key="detail" initial={{opacity: 0, display: "none"}}
                                    animate={{opacity: 1, display: "flex"}}
                                    exit={{opacity: 0, display: "none"}}
                                    className="flex justify-between">
                            <span>{comProps.fieldValue}</span>
                            <button onClick={() => setValue(true)}
                                    className="bg-buttonColor text-secondary font-semibold rounded
                                                py-1 px-4 h-8">Edit</button>
                        </motion.div>
                }
                {
                    value &&
                    <motion.div key="edit" initial={{opacity: 0, display: "none"}}
                         animate={{opacity: 1, display: "flex"}}
                         exit={{opacity: 0, display: "none"}} className="flex justify-between">
                        <InputWithValidation
                            id={comProps.id}
                            name={comProps.name}
                            formik={comProps.formik}
                            className="w-2/3"
                        />
                        <button onClick={() => setValue(false)}
                                className="bg-buttonColor text-secondary font-semibold rounded
                                                py-1 px-4 h-8">Submit</button>
                    </motion.div>
                }
            </AnimatePresence>
        </motion.div>
    )
}