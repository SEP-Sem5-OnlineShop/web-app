import React from "react"
import { useHistory } from "react-router-dom";
import RatingComponent from '../../../components/customer/ratingComponent';

export default function HomeItem({vendor}) {
    let history = useHistory()

    return (
        <div className="cursor-pointer" onClick={() => history.push(`/vendor_${vendor._id}`)}>
            <div className="w-full h-40 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${vendor.image})`}} />
            <div className="text-sm lg:text-lg font-medium">{`${vendor.vendor_name}`}</div>
            {/* <div className="text-xs lg:text-base">{"city"}</div> */}
            <div className="flex">
                <RatingComponent rating={vendor.rating} size={20} />
                <span className="px-2">{vendor.rating} ({vendor.ratingCount}+)</span>
            </div>
        </div>
    )
}