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
            <div className="w-full h-60 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${comProps.image})`}} />
            <div className="text-lg font-medium">{`${comProps.vendor} - ${comProps.road}`}</div>
            <div>{comProps.city}</div>
            <div>
                <span className="font-medium">{comProps.price}</span>
                <span>
                    <i className="fa fa-biking text-success text-2xl ml-4 mr-1"/>
                    {comProps.time}
                </span>
            </div>
        </div>
    )
}