import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const ProductComponent = ({ product, vendor_id }) => {

    const [customer_id, setCustomer_id] = useState(1);
    const [isAlert, setIsAlert] = useState(false);

    const handleRemove = (product_id) => {
        (isAlert ?
            fetch('http://localhost:8000/alerts/'+product_id , {method: 'DELETE'})
            : fetch('http://localhost:8000/alerts/'+product_id , {method: 'POST', body: {product,customer_id}})
        );
        (isAlert ?
            setIsAlert(false)
            : setIsAlert(true)
        );

    };

    return (
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-28 sm:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`vendor_${vendor_id}/product_${product.product_id}`}>
            <img src={ product.image } alt="" className="h-full w-20 sm:w-36 object-cover"/>
            </Link>
            <div className="mx-4 my-2 flex flex-col justify-between items-start">
                <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${vendor_id}/product_${product.product_id}`}>{ product.product_name }</Link>
                <span className="text-sm sm:text-lg text-secondary">Available: { product.stock }</span>
                <span className="text-sm sm:text-lg text-secondary">${ product.price }</span>
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col justify-center items-end">
                <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={() => handleRemove(product.product_id)}>
                    <FaBell color={isAlert ? "#ffc107" : "#e4e5e9" } size={24} />
                </button>
            </div>
        </div>

    );
};
 
export default ProductComponent;