import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import {axios} from "../../../api/index";
import OrderComponent from '../../../components/customer/orderComponent';
import LoadingBox from "../../../components/customer/loadingBox";
import MessageBox from "../../../components/customer/messageBox";
import { useSelector } from "react-redux";

const OrderHistoryScreen = () => {
    const history = useHistory();

    // const isLogged = useSelector(state => state.user.isLogin)
    // if (!isLogged) {
    //   history.push('/auth/login');
    // }
    // const [customer_id, setCustomer_id] = useState('613eba8b94acbe3710fed690');
    const userData = useSelector(state => state.user.userData);
    let customer_id = '';
    if (userData){
        customer_id = userData._id;
    }
    console.log(customer_id);

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);
    
    useEffect(() => {
        async function listOrders(customer_id){
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${window.localStorage.getItem("token")}`
                const { data } = await axios.get(`app/customer/purchases/${customer_id}`);
                console.log('order history screen customer order list');
                console.log(data);
                setOrders(data);
                setLoading(false);
                setError(null);
            } catch (err) {
                setLoading(false);
                console.log(err);
                setError(err);
            };
        };
        if (customer_id) {
            listOrders(customer_id);
        };
    }, [customer_id]);

    const handleReview = (order_id,product_id,review) => {
        async function addReview(order_id,product_id,review){
            try {
              console.log(review);
              await axios.post(`/orders/${order_id}/${product_id}`,review);
              alert('added new review and rating');
          } catch (err) {
            setError1(err);
            console.log(error1);
          };
        };
        addReview(order_id,product_id,review).then(() => {history.go(0);});
        // addReview(order_id,product_id,review);
    };

    return (
        <div>
        {loading ? (
            <LoadingBox></LoadingBox>
        ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
        ) : (
            <div className="px-2 py-4 sm:px-12 sm:py-12">
                <h1 className="text-3xl text-secondary flex flex-col">Order History</h1>
                <div className="mt-4 sm:mt-8 sm:mx-6 grid grid-cols-1 gap-4 lg:gap-6">
                    {orders && <>
                        {orders.map((order) => (
                            <OrderComponent order={order} customer_id={customer_id} handleReview={handleReview} key={order._id} />
                        ))}
                    </>}
                </div>
            </div>
        )}
        </div>
    );
}

export default OrderHistoryScreen;
