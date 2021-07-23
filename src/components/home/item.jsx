import React from 'react'
// import star from '../../../src/assets/svg/home/star.svg'
// import clock from '../../../src/assets/svg/home/clock.svg'

/**
 * This is the standard element for popup
 * src>component>home>item.jsx
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */


function item(props) {

    // const compProps = {
    //     img1: props.img1 || "",
    //     rate: props.rate|| "",
    //     time: props.time || "",
    // }

    return (props)?(
        // return(
        // <div className="bg-white box-border rounded-lg  h-12 w-20 p-4 
        // border-1 border-blue-500 border-opacity-75 md:border-opacity-50
        // filter drop-shadow-md md:drop-shadow-xl
        // ">
        <div class="w-32">
            <div className="popup-inner">
                {props.children}
            </div>

            {/* <div class="">
              <div className="w-34 md:w-auto border-black">
              <img width={116} src={compProps.image1} alt="image1" />
              
              </div>

            
            <div class="flex justify-between">
                <img width={12} src={star} alt="star" />
                <p class="px-1">{compProps.rate}</p>
                <p class="px-3"> </p>
                <img width={12} src={clock} alt="clock" />
                <p class="px-1">{compProps.time}</p>
            </div>
            
          </div> */}
            
        </div>
    ):"";
}

export default item
