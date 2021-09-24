import { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import Axios from 'axios';
import OrderComponent from '../../../components/customer/orderComponent';
import LoadingBox from "../../../components/customer/loadingBox";
import MessageBox from "../../../components/customer/messageBox";

const OrderHistoryScreen = () => {
    const customer_id = "01";

    const history = useHistory();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [error1, setError1] = useState(null);
    
    useEffect(() => {
        async function listOrders(customer_id){
            try {
                // const { data } = await Axios.get(`app/customer/orders/${customer_id}`);
                const data = [
                    {
                        _id:1,
                        customer_id:1,
                        vendor_id:1,
                        image:"/img/vendor.jpg",
                        date: '2021/09/12',
                        totalItems:7,
                        totalCost:700,
                        products:[
                            {
                                product_id: '1',
                                product_name: 'Burger with Fries',
                                vendor_id: '613a23c0dd295c38362b2cbe',
                                image: '/img/item1.png',
                                price: 100,
                                amount: 3,
                                rated: 4,
                                review: 'good',
                            },
                            {
                                product_id: '2',
                                product_name: 'Burger with Fries',
                                vendor_id: '613a23c0dd295c38362b2cbe',
                                image: '/img/item1.png',
                                price: 100,
                                amount: 4,
                                rated: null,
                                review: null,
                            }
                        ]
                    },
                    {
                        _id:2,
                        customer_id:1,
                        vendor_id:1,
                        image:"/img/vendor.jpg",
                        date: '2021/09/13',
                        totalItems:4,
                        totalCost:400,
                        products:[
                            {
                                product_id: '1',
                                product_name: 'Burger with Fries',
                                vendor_id: '613a23c0dd295c38362b2cbe',
                                image: '/img/item1.png',
                                price: 100,
                                amount: 1,
                                rated: 5,
                                review: 'good',
                            },
                            {
                                product_id: '2',
                                product_name: 'Burger with Fries',
                                vendor_id: '613a23c0dd295c38362b2cbe',
                                image: '/img/item1.png',
                                price: 100,
                                amount: 2,
                                rated: 3,
                                review: 'good',
                            },
                            {
                                product_id: '3',
                                product_name: 'Burger with Fries',
                                vendor_id: '613a23c0dd295c38362b2cbe',
                                image: '/img/item1.png',
                                price: 100,
                                amount: 1,
                                rated: 4,
                                review: 'good',
                            }
                        ]
                    }
                ]
                
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
              await Axios.post(`/orders/${order_id}/${product_id}`,review);
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
                            <OrderComponent order={order} handleReview={handleReview} key={order._id} />
                        ))}
                    </>}
                </div>
            </div>
        )}
        </div>
    );
}

export default OrderHistoryScreen;
