import React from "react"

export default function HomeItem(props) {

    const comProps = {
        image: props.image || '',
        vendor: props.vendor || '',
        road: props.road || '',
        city: props.city || '',
        price: props.price || '',
        time: props.time || ''
    }

    return (
        <div>
            <div className="w-full h-40 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${comProps.image})`}} />
            <div className="text-sm lg:text-lg font-medium">{`${comProps.vendor} - ${comProps.road}`}</div>
            <div className="text-xs lg:text-base">{comProps.city}</div>
            <div>
                <span className="font-medium text-xs lg:text-base">{comProps.price}</span>
                <span className="text-xs lg:text-base">
                    <i className="fa fa-biking text-success text-xs lg:text-base ml-4 mr-1"/>
                    {comProps.time}
                </span>
            </div>
        </div>
    )
}