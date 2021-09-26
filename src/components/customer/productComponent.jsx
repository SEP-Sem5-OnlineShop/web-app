import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Axios from 'axios';
import { useEffect } from "react";
import { useSelector } from "react-redux";

const ProductComponent = ({ product, vendor_id }) => {
    // const useData = useSelector(state => state.user.useData);
    // const customer_id = useData._id;
    const customer_id = 1;
    // if (!isLogged) {
    //   history.push('/auth/login');
    // }
    const productStrings = useSelector(state => state.language.languageFile.productpage)
    const history = useHistory();
    const [isAlert, setIsAlert] = useState(false);

    const [loading, setLoading] = useState(true);
    const [er, setEr] = useState(null);
    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);

    useEffect(() => {
        async function detailsAlert(customer_id, product_id){
            try {
                const { data } = await Axios.get(`app/customer/${customer_id}/alerts/${product_id}`);
                // const data = false;
                
                setIsAlert(data.isAlert || false);
                setLoading(false);
                setEr(null);
            } catch (err) {
                setLoading(false);
                console.log(err);
                setEr(err);
            };
        };
        if (customer_id) {
            detailsAlert(customer_id, product._id);
        };
    }, [customer_id, product._id]);

    const handleRemove = (product_id) => {
        async function addAlert(customer_id,product_id){
            try {
                await Axios.post(`app/customer/${customer_id}/alerts/${product_id}`);
                // alert('added alert');
          } catch (err) {
            setError(err);
            console.log(error);
          };
        };
        async function removeAlert(customer_id,product_id){
            try {
                await Axios.delete(`app/customer/${customer_id}/alerts/${product_id}`);
                // alert('removed alert');
          } catch (err) {
            setError1(err);
            console.log(error1);
          };
        };
        if (isAlert) {
            removeAlert(customer_id,product_id);
            setIsAlert(false)
        } else {
            if (customer_id) {
                addAlert(customer_id,product_id);
                setIsAlert(true)
            } else {
                history.push('/auth/login');
            }
        };
    };

    return (
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-28 sm:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`/vendor_${vendor_id}/product_${product._id}`}>
            <img src={ product.imageUrl } alt="" className="h-full w-20 sm:w-36 object-cover"/>
            </Link>
            <div className="mx-4 my-2 flex flex-col justify-between items-start">
                <Link className="text-base sm:text-xl text-secondary font-semibold" to={`/vendor_${vendor_id}/product_${product._id}`}>{ product.product_name }</Link>
                <span className="text-sm sm:text-lg text-secondary">{productStrings.available}: { product.stock }</span>
                <span className="text-sm sm:text-lg text-secondary">{productStrings.currency} { product.price }</span>
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col justify-center items-end">
                <button className="rounded-xl shadow w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={() => handleRemove(product._id)}>
                    <FaBell color={isAlert ? "#ffc107" : "#e4e5e9" } size={24} />
                </button>
            </div>
        </div>

    );
};
 
export default ProductComponent;