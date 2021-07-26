import React from 'react'

/**
 * This is the standard element for popup
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


function popup(props) {
    return (props.trigger)?(
        <div className="bg-white box-border rounded-lg  h-55 sm:h-65 w-86 sm:w-96 p-4 
        border-1 border-blue-500 border-opacity-75 md:border-opacity-50
        filter drop-shadow-lg lg:drop-shadow-2xl
        ">
            <div className="popup-inner">
                {props.children}
                {/* <button className="close-button" onClick={()=>props.setTrigger(false)}><b>close</b></button> */}
                
            </div>
            
        </div>
    ):"";
}

export default popup
