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
        readOnly: props.readOnly || false,
        disabled: props.disabled || false,
        labelStyles: props.labelStyles || {},
        value: props.value || ""
    }

    return (
        <React.Fragment>
            <div className={`mb-2 ${compProps.className}`}>
                {
                    compProps.label
                        ?
                    <label
                    className={`font-medium text-secondary text-sm xs:text-lg md:text-base`}
                    style={compProps.labelStyles}>
                        {compProps.label}</label>
                        :
                        null
                }
                <input
                    id={compProps.id}
                    name={compProps.name}
                    type={compProps.type}
                    onChange={compProps.formik.handleChange}
                    onBlur={compProps.formik.handleBlur}
                    value={compProps.formik.values[compProps.name] || compProps.value}
                    readOnly={compProps.readOnly}
                    disabled={compProps.disabled}
                    className={
                        `rounded-md
                        mt-1 p-2
                        h-10 w-full
                        focus:outline-none
                        focus:shadow-md
                        ${compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ?
                                'outline-none ring-2 ring-danger border-transparent' : ''}`
                    }
                />
                {compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ? (
                    <motion.div className="mt-1 text-danger text-xs xs:text-sm">
                        {compProps.formik.errors[compProps.name]}
                    </motion.div>
                ) : null}
            </div>
        </React.Fragment>
    )
}