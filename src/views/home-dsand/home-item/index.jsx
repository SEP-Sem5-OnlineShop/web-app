import React from "react"
import { useHistory } from "react-router-dom";
import { getFileUrl } from "../../../api/azure-storage-blob";
import RatingComponent from '../../../components/customer/ratingComponent';

export default function HomeItem({vendor}) {
    let history = useHistory()

    return (
        <div className="cursor-pointer" onClick={() => history.push(`/vendor_${vendor._id}`)}>
            <div className="w-full h-40 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${getFileUrl(vendor.vendor.imageUrl)} )`}} />
            <div data-testid="home-vendor" className="text-sm lg:text-lg font-medium dark:text-white">{`${vendor.vendor.shopName || "Vendor Name"}`}</div>
            {/* <div className="text-xs lg:text-base">{"city"}</div> */}
            <div className="flex">
                <RatingComponent rating={vendor.vendor.rating || 0} size={20} />
                <span className="px-2 dark:text-white">{(Math.round(vendor.vendor.rating * 10) / 10).toFixed(1) || 0} ({vendor.vendor.numReviews || 0}+)</span>
            </div>
        </div>
    )
}