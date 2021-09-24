import { useState } from 'react';
import { Link } from 'react-router-dom';
import RatingComponent from './ratingComponent';
import { FaStar } from "react-icons/fa";
import { useSelector } from 'react-redux';

export default function OrderComponent({ order, handleReview }) {
  const productStrings = useSelector(state => state.language.languageFile.productpage)
    const [showModal, setShowModal] = useState(false);
    const [reviewProduct, setReviewProduct] = useState('');
    // const [isAlert, setIsAlert] = useState(false);
    const vendor_name = "Yummy Bakers"
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');
    const customer = '613ebc89c71d2e07e0ec5e93';

    const handleSubmit = () => {
      if (review && rating) {
        handleReview(order._id, reviewProduct, { rating, review, customer: customer })
        setShowModal(false);
      } else {
        alert('Please enter review and rating');
      }
  };
    return (
        <>
        <div className="flex justify-start rounded-2xl overflow-hidden shadow-md bg-white transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`/vendor_${order.vendor_id}`}>
            <img src={ order.image } alt="" className="my-2 h-20 w-20 sm:h-64 sm:w-72 rounded-2xl object-cover"/>
            </Link>
            <div className="w-full mx-4 my-2 flex flex-col justify-start items-start">
                <Link className="text-base sm:text-xl text-secondary font-semibold sm:mx-2" to={`/vendor_${order.vendor_id}`}>{ vendor_name }</Link>
                <span className="text-sm sm:text-base text-secondary sm:mx-2">{order.totalItems} {productStrings.items} {productStrings.for} {productStrings.currency} {order.totalCost} • {order.date} at 08:10 PM •</span>
                <div className="w-full mt-4 grid grid-cols-1 gap-4 lg:gap-4">
                    {order.products && <>
                        {order.products.map((product) => (
                            <div className="flex justify-between items-center sm:mx-6 shadow-sm overflow-hidden transform hover:shadow-md transition ease-out duration-400" key={product.product_id}>
                                <div className="flex">
                                    <Link to={`/vendor_${product.vendor_id}/product_${product.product_id}`}>
                                        <img src={ product.image } alt="" className="h-full my-2 w-10 sm:w-20 object-cover"/>
                                    </Link>
                                    <div className="mx-4 my-2 flex flex-col justify-between items-start">
                                        <Link className="text-base sm:text-xl text-secondary font-semibold" to={`/vendor_${product.vendor_id}/product_${product.product_id}`}>{ product.product_name }</Link>
                                        <span className="text-sm sm:text-lg text-secondary">{productStrings.items}: { product.amount }</span>
                                        <span className="text-sm sm:text-lg text-secondary">{productStrings.currency} { product.price * product.amount }</span>
                                    </div>
                                </div>
                                <div className="sm:mr-4">
                                {product.rated ? (
                                    <RatingComponent rating={product.rated} size={24} />
                                ) : (
                                    <div>
                                        <button className="sm:mx-1 rounded-xl shadow w-24 h-12 sm:w-28 sm:h-14 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400 " onClick={() => setShowModal(true) && setReviewProduct(product.product_id)}>
                                            <span className="">Add Review</span>
                                        </button>
                                    </div>
                                )}
                                </div>
                            </div>
                        ))}
                    </>}
                </div>
            </div>
        </div>
        
        {showModal ? (
        <>
          <div
            className="justify-center items-center bg-black bg-opacity-50 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
          >
            <div className="relative w-auto my-6 mx-auto sm:min-w-1/2">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-text rounded-t">
                  <h3 className="text-3xl text-secondary font-semibold">
                    Add Review
                  </h3>
                  <button
                    className="p-1 ml-auto border-0 text-text opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                <div className="relative px-6 pb-4 flex-auto">
                    <div className="flex">
                      {[...Array(5)].map((item, index) => {
                        const givenRating = index + 1;
                        return (
                          <label>
                            <input className="invisible" type="radio" value={givenRating} onClick={() => {setRating(givenRating);}}/>
                            <FaStar color={ givenRating < rating || givenRating === rating ? "#ffc107" : "#e4e5e9" } size={25} />
                          </label>
                        );
                      })}
                    </div>
                    <input type="text" value={review} onChange={(e) => setReview(e.target.value)} className="bg-cardColor appearance-none border-2 border-text rounded w-full mt-4 py-2 px-4 text-text leading-tight focus:outline-none focus:bg-white focus:border-textLight"/>
                </div>
                <div className="flex items-center justify-end px-6 pb-4 rounded-b">
                  <button className="bg-accent text-danger font-bold uppercase text-sm px-5 py-2 rounded shadow-sm hover:shadow-lg outline-none focus:outline-none mr-4 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => setShowModal(false)}>
                    Close
                  </button>
                  <button className="bg-success text-white font-bold uppercase text-sm px-6 py-2 rounded shadow-sm hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button" onClick={() => handleSubmit()}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
        ) : null}
        </>
    )
}
