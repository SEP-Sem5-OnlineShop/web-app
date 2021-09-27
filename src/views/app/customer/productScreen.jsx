import { useEffect, useState } from 'react';
import { useHistory, useParams } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import RatingComponent from '../../../components/customer/ratingComponent';
import ReviewComponent from '../../../components/customer/reviewComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import { useSelector } from 'react-redux';
import {axios} from "../../../api/index";

const ProductScreen = () => {
    const { id: vendor_id, pid: product_id } = useParams();
    const productStrings = useSelector(state => state.language.languageFile.productpage)
    const history = useHistory();

    // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
    const userData = useSelector(state => state.user.userData);
    let customer_id = '';
    if (userData){
        customer_id = userData._id;
    }
    console.log(customer_id)

    const [product, setProduct] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [er, setEr] = useState(null);
    const [alert, setAlert] = useState(false);
    const [error1, setError1] = useState(null);
    const [error2, setError2] = useState(null);


    useEffect(() => {
        async function detailsProduct(product_id){
            setLoading(true);
            try {
                const { data } = (await axios.get(`app/customer/product/${product_id}`)).data;
                console.log('product screen product details');
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
        if (vendor_id && product_id) {
            detailsProduct(product_id);
        };
    }, [vendor_id, product_id]);

    useEffect(() => {
        async function detailsAlert(customer_id, product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.get(`app/customer/${customer_id}/alerts/${product_id}`);
                // const data = false;
                console.log('alert details');
                console.log(data);
                if (data._id){
                    setAlert(true);
                } else {
                    setAlert(false);
                }
                setLoading(false);
                setEr(null);
            } catch (err) {
                setLoading(false);
                console.log(err);
                setEr(err);
            };
        };
        if (customer_id) {
            detailsAlert(customer_id, product_id);
        };
    }, [customer_id, product_id]);

    const handleRemove = (product_id) => {
        async function addAlert(customer_id,product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.post(`app/customer/${customer_id}/alerts/${product_id}`);
                console.log('new alert');
                console.log(data);
                // alert('added alert');
            } catch (err) {
                setError1(err);
                console.log(error1);
            };
        };
        async function removeAlert(customer_id,product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.delete(`app/customer/${customer_id}/alerts/${product_id}`);
                console.log('alert removed');
                console.log(data);
                // alert('removed alert');
            } catch (err) {
                setError2(err);
                console.log(error2);
            };
        };
        if (alert) {
            removeAlert(customer_id,product_id);
            setAlert(false)
        } else {
            if (customer_id) {
                addAlert(customer_id,product_id);
                setAlert(true)
            } else {
                history.push('/auth/login');
            }
        };
    };

    return (
        <>
        {(loading ) ? (
            <LoadingBox></LoadingBox>
        ) : (error) ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-16">
            <div className="relative">
                <div  className="w-full h-full bg-center bg-cover rounded-xl" style={{ minHeight: '50vh', backgroundImage: `url(${product.imageUrl})` }}>
                </div>

                <div className="absolute flex top-3 right-3">
                    <div className="p-4 bg-textLight bg-opacity-60 rounded-xl">
                        <button onClick={() => handleRemove(product_id)}>
                            <FaBell color={alert ? "#ffc107" : "#e4e5e9" } size={25} />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-textLight">{product.product_name}</span>
                <div className="mt-4 flex">
                    <RatingComponent rating={product.rating} size={25} />
                    <span className="px-2">{product.rating} ({product.numReviews}+)</span>
                </div>
                <div className="mt-4">
                    <span className="text-sm sm:text-lg text-secondary">{productStrings.available}: { product.stock }</span>
                </div>
                <div className="mt-4">
                    <span className="text-sm sm:text-lg text-secondary">{productStrings.price}: {productStrings.currency} { product.price }</span>
                </div>
                <div className="mt-4 sm:mt-8">
                    <span className="text-secondary">{product.description}</span>
                </div>
            </div>
            <div>
                <div className="text-xl text-textLight font-medium">{productStrings.reviews}</div>
                <div className="mt-4">
                    {product.reviews && <>
                        {product.reviews.map((review) => (
                            <ReviewComponent key={review._id} review={review} />
                        ))}
                    </>}
                </div>
            </div>
        </div>
        )}
        </>
    )
};
 
export default ProductScreen;