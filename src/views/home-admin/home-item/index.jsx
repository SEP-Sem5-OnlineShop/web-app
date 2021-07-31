import React from "react"
import star from '../../../assets/svg/home-admin/star.svg'

export default function HomeItem(props) {

    const comProps = {
        image: props.image || '',
        vendor: props.vendor || '',
        city: props.city || '',
        rate: props.rate || '',
        
    }

    return (
        <div>
            <div className="w-full h-40 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${comProps.image})`}} />
            <div className="text-sm lg:text-lg font-medium">{`${comProps.vendor} - ${comProps.city}`}</div>
            {/* <div className="text-xs lg:text-base">{comProps.city}</div> */}
            <div className="flex justify-start">
                <span className=''><img className="w-3 lg:w-5" src={star} alt='star' /></span>
                <span className="font-medium text-xs lg:text-base px-2">{comProps.rate}</span>
                {/* <span className="text-xs lg:text-base">
                    <i className="fa fa-biking text-success text-xs lg:text-base ml-4 mr-1"/>
                    {comProps.time}
                </span> */}
            </div>
        </div>
    )
}