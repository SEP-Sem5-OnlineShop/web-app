import React from "react"
import { useHistory } from "react-router-dom";
import { getFileUrl } from "../../../api/azure-storage-blob";
import RatingComponent from '../../../components/customer/ratingComponent';

export default function HomeProductItem({product}) {
    let history = useHistory()

    return (
        <div className="cursor-pointer" onClick={() => history.push(`/vendor_${product.seller}/product_${product._id}`)}>
            <div className="w-full h-40 bg-center bg-cover rounded-xl" style={{backgroundImage: `url(${getFileUrl(product.imageUrl)} )`}} />
            <div data-testid="home-vendor" className="text-sm lg:text-lg font-medium dark:text-white">{`${product.product_name || "Vendor Name"}`}</div>
            {/* <div className="text-xs lg:text-base">{"city"}</div> */}
            <div className="flex">
                <RatingComponent rating={product.rating || 0} size={20} />
                <span className="px-2 dark:text-white">{(Math.round(product.rating * 10) / 10).toFixed(1) || 0} ({product.numReviews || 0}+)</span>
            </div>
        </div>
    )
}