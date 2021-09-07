import React from 'react'

/**
 * This is the standard element for review
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


export default function ReviewComponent(props) {
    const compProps = {
        name: props.name || "",
        review: props.review || "",
        date: props.date || ""
    }
    return(
        <div>
            <div className='rounded-sm shadow-md bg-white border-blck w-full md:w-3/5'>
            <p className='text-base sm:text-lg px-4'>{compProps.name}</p><br></br>

            <p className='text-xs sm:text-sm font-extralight'>{compProps.date}</p>
            <p className='text-xs sm:text-sm'>{compProps.review}</p>
            <br></br>
        </div><br></br>
        </div>
        
    )
}

