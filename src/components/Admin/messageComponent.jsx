import React from 'react'

/**
 * This is the standard element for message popup
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


export default function popup(props) {
    const compProps = {
        label: props.label || "",
        message: props.message || ""
    }
    return(
        <div className>
            <label className='flex justify-center font-medium font-bold text-secondary text-sm xs:text-lg md:text-base'>{compProps.label}</label>
            <br></br>
            <input
                    label={compProps.message}
                    message={compProps.message}
                    className={
                        `rounded-xl
                        bg-primary
                        w-full
                        mt-1 p-2
                        h-30 w-full
                        focus:outline-none
                        focus:shadow-md`}
                    
                        />
        </div>
    )
}

