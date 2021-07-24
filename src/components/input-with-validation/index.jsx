import React from "react"
import {motion} from "framer-motion"

/**
 * This is the standard element for input tags with validation
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputWithValidation (props) {

    /**
     * label: This is for element label
     * id: This is for input tag id
     * type: This is for the type of input tag
     * formik: This is for the formik object from formik library
     * @type {{formik: ({}|{}), label: string, id: string, type: string}}
     */
    const compProps = {
        label: props.label || "",
        id: props.id || "",
        className: props.className || "",
        name: props.name || "",
        type: props.type || "text",
        formik: props.formik || {},
    }

    return (
        <React.Fragment>
            <div className={`w-5/6 mb-2 ${compProps.className}`}>
                <label className='font-medium text-secondary text-xl md:text-base'>{compProps.label}</label>
                <input
                    id={compProps.id}
                    name={compProps.name}
                    type={compProps.type}
                    onChange={compProps.formik.handleChange}
                    onBlur={compProps.formik.handleBlur}
                    value={compProps.formik.values[compProps.name]}
                    className={
                        `rounded-xl mt-1 h-12 md:h-10 p-2 w-full focus:outline-none
                        ${compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ?
                                'outline-none ring-2 ring-danger border-transparent' : ''}`
                    }
                />
                {compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ? (
                    <motion.div className="mt-1 text-danger text-sm">
                        {compProps.formik.errors[compProps.name]}
                    </motion.div>
                ) : null}
            </div>
        </React.Fragment>
    )
}