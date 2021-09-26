import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {axios} from "../../api/index";

const AlertComponent = ({ alert, handleRemove }) => {
    
    const productStrings = useSelector(state => state.language.languageFile.productpage);

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [vendor, setVendor] = useState({})
    const [loading1, setLoading1] = useState(true);
    const [error1, setError1] = useState(null);

    useEffect(() => {
        async function detailsProduct(product_id){
            setLoading(true);
            try {
                const { data } = (await axios.get(`app/customer/product/${product_id}`)).data;
                console.log('alert screen product details');
                console.log(data);
                setProduct(data);
                setLoading(false);
                setError(null);
            } catch (err) {
                setLoading(false);
                console.log(err);
                setError(err);
            };
        };
        async function detailsVendor(vendor_id){
            setLoading(true);
            try {
                const { data } = await axios.get(`app/customer/vendors/${vendor_id}`);
                console.log('alert screen vendor details');
                console.log(data);
                setVendor(data);
                setLoading1(false);
              } catch (error) {
                console.log("vendor felch error");
                setError1("vendor felch error");
                setLoading1(false);
              };
        };
        if (alert.product_id) {
            detailsProduct(alert.product_id);
        };
        if(product.seller){
            detailsVendor(product.seller);
        }
    }, [alert.product_id, product.seller]);

    return (
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-28 sm:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`/vendor_${product.seller}/product_${alert.product_id}`}>
            <img src={ product.imageUrl } alt="" className="h-full w-20 sm:w-36 sm:h-36 object-cover"/>
            </Link>
            <div className="mx-2 my-2 flex flex-col justify-between items-start">
                <Link className="text-base sm:text-xl text-secondary font-semibold" to={`/vendor_${product.seller}/product_${alert.product_id}`}>{ product.product_name }</Link>
                <Link className="text-sm sm:text-lg text-secondary" to={`/vendor_${product.seller}`}>{ vendor.vendor_name }</Link>
                <span className="text-sm sm:text-lg text-secondary">{productStrings.currency} { product.price }</span>
                {/* <div className="sm:mt-1 flex flex-row justify-between items-center">
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400" onClick={ handleDecrease }>
                        <span className="text-3xl sm:text-4xl text-text">-</span>
                    </button>
                    <span className="mx-1 text-lg sm:text-xl text-secondary">{ count }</span>
                    <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-105 hover:shadow-md transition ease-out duration-400" onClick={ handleIncrease }>
                        <span className="text-3xl sm:text-4xl text-text">+</span>
                    </button>
                </div> */}
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col items-end justify-center">
                <button className="rounded-xl shadow w-10 h-10 sm:w-12 sm:h-12 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={() => handleRemove(alert.user_id,alert.product_id)}>
                    <span className="text-3xl sm:text-4xl text-danger">x</span>
                </button>
                {/* <div className="text-base sm:text-xl text-secondary flex justify-center">{ alert.price*count }</div> */}
            </div>
        </div>
    );
};
 
export default AlertComponent;