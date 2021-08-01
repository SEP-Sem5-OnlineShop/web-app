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
            <div className='rounded-sm border-4 border-white w-1/2'>
            <p>from: {compProps.name}</p>
            <p>{compProps.review}</p>
            <p>{compProps.date}</p><br></br>
        </div><br></br>
        </div>
        
    )
}

