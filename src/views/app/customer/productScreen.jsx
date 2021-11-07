import { useEffect, useState, useLayoutEffect } from 'react';
import { Link, useHistory, useParams } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import RatingComponent from '../../../components/customer/ratingComponent';
import ReviewComponent from '../../../components/customer/reviewComponent';
import LoadingBox from '../../../components/customer/loadingBox';
import MessageBox from '../../../components/customer/messageBox';
import { useSelector } from 'react-redux';
import {axios} from "../../../api/index";
import { getFileUrl } from '../../../api/azure-storage-blob';
import parse from 'html-react-parser';

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

    const [width, ] = useWindowSize();


    useEffect(() => {
        let mounted = true;
        async function detailsProduct(product_id){
            setLoading(true);
            try {
                const { data } = (await axios.get(`gen/customer/product/${product_id}`)).data;
                console.log('product screen product details');
                console.log(data);
                if (mounted) {
                    setProduct(data);
                    setLoading(false);
                    setError(null);
                };
            } catch (err) {
                setLoading(false);
                console.log(err);
                setError(err);
            };
        };
        if (vendor_id && product_id) {
            detailsProduct(product_id);
        };
        return () => {
            mounted = false;
            // console.log("cleanup")
        };
    }, [vendor_id, product_id]);

    useEffect(() => {
        let mounted = true;
        async function detailsAlert(customer_id, product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.get(`app/customer/${customer_id}/alerts/${product_id}`);
                // const data = false;
                console.log('alert details');
                console.log(data);
                if (mounted) {
                    if (data._id){
                        setAlert(true);
                    } else {
                        setAlert(false);
                    }
                    setLoading(false);
                    setEr(null);
                };
            } catch (err) {
                setLoading(false);
                console.log(err);
                setEr(err);
            };
        };
        if (customer_id) {
            detailsAlert(customer_id, product_id);
        };
        return () => {
            mounted = false;
            // console.log("cleanup")
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
        <div className="mx-1 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8 md:gap-16">
            <div className="relative">
                <div  className="w-full h-full bg-center bg-cover rounded-xl" style={{ minHeight: '50vh', backgroundImage: `url(${getFileUrl(product.imageUrl)})` }}>
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
                <span className="text-xl sm:text-2xl md:text-4xl font-bold text-textLight dark:text-white">{product.product_name}</span>
                <div>
                    <VendorName vendor_id={product.seller} />
                </div>
                <div className="mt-4 flex">
                    <RatingComponent rating={product.rating} size={width>600?25:width>480?22:width>400?18:16} />
                    <span className="px-2">{(Math.round(product.rating * 10) / 10).toFixed(1)} ({product.numReviews}+)</span>
                </div>
                <div className="mt-4">
                    <span className="text-sm sm:text-lg text-secondary dark:text-white">{productStrings.available}: { product.stock }</span>
                </div>
                <div className="mt-4">
                    <span className="text-sm sm:text-lg text-secondary dark:text-white">{productStrings.price}: {productStrings.currency} { product.price }</span>
                </div>
                <div className="mt-4 sm:mt-8">
                    <span className="text-sm sm:text-lg text-secondary dark:text-white">{parse(`${product.description}`)}</span>
                </div>
            </div>
            <div>
                <div className="text-xl text-textLight font-medium dark:text-white">{productStrings.reviews}</div>
                    {(product.reviews && product.reviews.length < 1) && <>
                        <div className="text-xs text-text ml-2 mt-2 dark:text-white">No Reviews</div>
                    </>}
                <div className="mt-4 sm:mt-6">
                    {product.reviews && <>
                        {product.reviews.map((review) => (
                            <ReviewComponent key={review._id} review={review} width={width} />
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

const VendorName = ({vendor_id}) => {
    const [vendorDetails, setVendorDetails] = useState({})
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);
    useEffect(() => {
        let mounted = true;
        async function detailsVendor(vendor_id){
          try {
            const { data } = await axios.get(`gen/customer/vendors/${vendor_id}`);
            console.log('product screen vendor details');
            console.log(data);
            if (mounted) {
                setVendorDetails(data);
                setLoading3(false);
                setError3(null);
            };
          } catch (err) {
            if (mounted) {
                setLoading3(false);
                console.log(err);
                setError3(err);
            };
          };
        };
        if (vendor_id) {
            detailsVendor(vendor_id);
        };
        return () => {
            mounted = false;
            // console.log("cleanup")
        };
      }, [vendor_id]);
  
    return (
      <Link className="text-xs xs:text-sm sm:text-base md:text-lg text-secondary font-semibold dark:text-buttonColor" to={`/vendor_${vendor_id}`}>{ vendorDetails.vendor_name }</Link>
    );
}

function useWindowSize() {
const [size, setSize] = useState([0, 0]);
useLayoutEffect(() => {
    function updateSize() {
    setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
}, []);
return size;
};