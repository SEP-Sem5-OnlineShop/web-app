import React from 'react'
import { Link } from 'react-router-dom';
import RatingComponent from '../ratingComponent';

export default function OrderComponent({ order, handleReview }) {
    const customer_id = 1;
    // const [isAlert, setIsAlert] = useState(false);
    const vendor_name = "Yummy Bakers"

    const handleRemove = (product_id) => {

    };

    return (
        <div className="flex justify-start rounded-2xl overflow-hidden shadow-md bg-white transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`vendor_${order.vendor_id}`}>
            <img src={ order.image } alt="" className="my-2 h-20 w-20 sm:h-64 sm:w-64 rounded-2xl object-cover"/>
            </Link>
            <div className="w-full mx-4 my-2 flex flex-col justify-start items-start">
                {/* <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${vendor_id}/product_${product._id}`}>{ product.product_name }</Link> */}
                {/* <span className="text-sm sm:text-lg text-secondary">Available: { product.stock }</span>
                <span className="text-sm sm:text-lg text-secondary">${ product.price }</span> */}
                <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${order.vendor_id}`}>{ vendor_name }</Link>
                <span className="text-sm sm:text-base text-secondary">{order.totalItems} items for LKR {order.totalCost} • {order.date} at 08:10 PM •</span>
                <div className="w-full mt-4 grid grid-cols-1 gap-4 lg:gap-4">
                    {order.products && <>
                        {order.products.map((product) => (
                            <div className="flex justify-between shadow-sm overflow-hidden transform hover:shadow-md transition ease-out duration-400" key={product.product_id}>
                                <div className="flex">
                                <Link to={`vendor_${product.vendor_id}/product_${product.product_id}`}>
                                    <img src={ product.image } alt="" className="h-full my-2 w-10 sm:w-20 object-cover"/>
                                </Link>
                                <div className="mx-4 my-2 flex flex-col justify-between items-start">
                                    <Link className="text-base sm:text-xl text-secondary font-semibold" to={`vendor_${product.vendor_id}/product_${product.product_id}`}>{ product.product_name }</Link>
                                    <span className="text-sm sm:text-lg text-secondary">Items: { product.amount }</span>
                                    <span className="text-sm sm:text-lg text-secondary">lkr.{ product.price * product.amount }</span>
                                </div>
                                </div>
                                <div className="mr-8">
                                    <RatingComponent rating={4}/>
                                    <input type="text" />
                                </div>
                            </div>
                        ))}
                    </>}
                </div>
                {/* <OrderComponent order={order} handleReview={handleReview} key={order._id} /> */}
                {/* <div className="mr-1 my:4 sm:mx-4 flex flex-col justify-center items-end">
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={() => handleRemove(product._id)}>
                        <FaBell color={isAlert ? "#ffc107" : "#e4e5e9" } size={24} />
                    </button>
                </div> */}
            </div>
        </div>
    )
}
