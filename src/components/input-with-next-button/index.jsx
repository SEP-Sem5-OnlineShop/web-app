import React from "react"

/**
 * This is the standard element for input tags with validation
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function InputWithValidation(props) {

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
            <div className={compProps.className}>
                <div className="mt-2">
                    <div className="flex justify-center items-center mt-2">
                        <button
                            className="h-8 w-8 mb-4 xxs:h-10 xxs:w-10 rounded-full p-0 shadow-md flex rounded-full justify-center items-center bg-white">
                            <i className="text-secondary font-bold fas fa-chevron-left fa-xs"/>
                        </button>
                        <div className="flex flex-col w-2/3 xxs:w-w-3/4 mx-2 h-24 md:h-28">
                            <label
                                className='font-medium text-secondary text-sm xs:text-lg md:text-base'>{compProps.label}</label>
                            <input
                                id={compProps.id}
                                name={compProps.name}
                                type={compProps.type}
                                onChange={compProps.formik.handleChange}
                                onBlur={compProps.formik.handleBlur}
                                value={compProps.formik.values[compProps.name]}
                                className={
                                    `rounded-xl 
                                    mt-1 p-2
                                    h-12 md:h-10
                                    focus:outline-none
                                    focus:shadow-md
                                    ${compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ?
                                        'outline-none ring-2 ring-danger border-transparent' : ''}`
                                }
                            />
                            {compProps.formik.touched[compProps.name] && compProps.formik.errors[compProps.name] ? (
                                <div className="mt-1 text-danger text-xs xs:text-sm">
                                    {compProps.formik.errors[compProps.name]}
                                </div>
                            ) : null}
                        </div>
                        <button
                            className="h-8 w-8 mb-4 xxs:h-10 xxs:w-10 rounded-full p-0 shadow-md flex rounded-full justify-center items-center bg-white">
                            <i className="text-secondary font-bold fas fa-chevron-right fa-xs"/>
                        </button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}