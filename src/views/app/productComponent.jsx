// import { useState } from "react";
import { Link } from "react-router-dom";

const ProductComponent = ({ product, vendor_id }) => {

    return (
        <div className="flex justify-start rounded-2xl overflow-hidden shadow-md bg-white h-28 sm:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${vendor_id}/product_${product.product_id}`}>
            <img src={ product.image } alt="" className="h-full w-20 sm:w-36 sm:h-36 object-cover"/>
            </Link>
            <div className="mx-4 my-2 flex flex-col justify-between items-start">
                <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${vendor_id}/product_${product.product_id}`}>{ product.product_name }</Link>
                <span className="text-sm sm:text-lg text-secondary">Available: { product.stock }</span>
                <span className="text-sm sm:text-lg text-secondary">{ product.price }</span>
            </div>
        </div>

    );
};
 
export default ProductComponent;