import { useState, useLayoutEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import {axios} from "../../api/index";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getFileUrl } from "../../api/azure-storage-blob";
import {driverSocket} from "../../socket/index"

const DriverProductComponent = ({ stockproduct, vendor_id, customer_id }) => {
    
    // customer_id 613eba8b94acbe3710fed690
    
    const productStrings = useSelector(state => state.language.languageFile.productpage)
    const customer = useSelector(state => state.user.userData)
    const history = useHistory();
    const [alert, setAlert] = useState(false);

    const [loading, setLoading] = useState(true);
    const [er, setEr] = useState(null);
    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);
    const [product, setProduct] = useState({});
    const [loading3, setLoading3] = useState(true);
    const [error3, setError3] = useState(null);

    const [timeoutId, setTimeoutId] = useState(0)
    const [timeoutInitiated, setTimoutInitiated] = useState(false)

    const [width, ] = useWindowSize();

    useEffect( () => {
        async function detailsProduct(product_id){
            try {
                const { data } = (await axios.get(`gen/customer/product/${product_id}`)).data;
                console.log('driver screen product details');
                console.log(data);
                setProduct(data);
                setLoading3(false);
                setError3(null);
            } catch (err) {
                setLoading3(false);
                console.log(err);
                setError3(err);
            };
        };
        if (stockproduct.productId) {
            detailsProduct(stockproduct.productId);
        };
    }, [stockproduct.productId]);

    useEffect(async () => {
        async function detailsAlert(customer_id, product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.get(`app/customer/${customer_id}/alerts/${product_id}`);
                // const data = false;
                if (data._id){
                    setAlert(true);
                } else {
                    setAlert(false);
                }
                setLoading(false);
                setEr(null);
            } catch (err) {
                setLoading(false);
                setEr(err);
            };
        };
        if (customer_id) {
            await detailsAlert(customer_id, stockproduct.productId);
        };
    }, [customer_id, stockproduct.productId]);

    const handleRemove = (product_id) => {
        async function addAlert(customer_id,product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                await axios.post(`app/customer/${customer_id}/alerts/${product_id}`);
                const payload = {productId: product_id, productName: product.product_name, customer: customer}
                const timeoutId = setTimeout(async () => {
                    await driverSocket.emit("alert:create", {room: "61559c6de403553fb8f2a3ca", payload: payload})
                    setTimoutInitiated(true)
                }, 2000)
                setTimeoutId(timeoutId)
                console.log(timeoutId)
                // alert('added alert');
            } catch (err) {
                setError(err);
                console.log(error);
            };
        };
        async function removeAlert(customer_id,product_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                await axios.delete(`app/customer/${customer_id}/alerts/${product_id}`);
                const payload = {productId: product_id, productName: product.product_name, customer: customer}
                clearTimeout(timeoutId)
                if(timeoutInitiated) driverSocket.emit("alert:remove", {room: "61559c6de403553fb8f2a3ca", payload: payload})
                // alert('removed alert');
            } catch (err) {
                setError1(err);
                console.log(error1);
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
        <div>
        {(stockproduct.productId && stockproduct.stock && stockproduct.price) ?
        <div className="flex justify-between rounded-2xl overflow-hidden shadow-md bg-white h-full xs:h-24 sm:h-28 md:h-36 transform hover:scale-105 hover:shadow-lg transition ease-out duration-400" >
            <Link to={`/vendor_${vendor_id}/product_${product._id}`}>
            <img src={`${getFileUrl(product.imageUrl)}` } alt="" className="h-full w-20 sm:w-28 md:w-36 object-cover"/>
            </Link>
            <div className="mx-2 my-1 xs:mx-4 xs:my-2 flex flex-col justify-between items-start">
                <Link className="text-xs xs:text-sm sm:text-base md:text-lg text-secondary font-semibold" to={`/vendor_${vendor_id}/product_${product._id}`}>{ product.product_name }</Link>
                <span className="text-xs xs:text-sm sm:text-base md:text-lg text-secondary">{productStrings.available}: { stockproduct.stock }</span>
                <span className="text-xs xs:text-sm sm:text-base md:text-lg text-secondary">{productStrings.currency} { stockproduct.price }</span>
            </div>
            <div className="mr-1 my:4 sm:mx-4 flex flex-col justify-center items-end">
                <button className="rounded-xl shadow w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 flex justify-center items-center bg-white transform hover:scale-110 hover:shadow-md transition ease-out duration-400" onClick={() => handleRemove(product._id)}>
                    <FaBell color={alert ? "#ffc107" : "#e4e5e9" } size={width>600?24:width>480?20:width>380?18:14} />
                </button>
            </div>
        </div>
        : null
        }
        </div>

    );
};
 
export default DriverProductComponent;

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