import { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import OrderComponent from '../../../components/customer/OrderComponent';
// import { listOrders } from '../../../actions/alertActions';
import LoadingBox from "../../../components/customer/LoadingBox";
import MessageBox from "../../../components/customer/MessageBox";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const OrderHistoryScreen = () => {
    const customer_id = "01";
    const loading = false;
    const error = false;

    const orders = [
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
                    product_name: 'Burger with some',
                    vendor_id: '613a23c0dd295c38362b2cbe',
                    image: '/img/item1.png',
                    price: 100,
                    amount: 3,
                    rated: 4,
                    review: 'good',
                },
                {
                    product_id: '2',
                    product_name: 'Burger with some',
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
                    product_name: 'Burger with some',
                    vendor_id: '613a23c0dd295c38362b2cbe',
                    image: '/img/item1.png',
                    price: 100,
                    amount: 1,
                    rated: 5,
                    review: 'good',
                },
                {
                    product_id: '2',
                    product_name: 'Burger with some',
                    vendor_id: '613a23c0dd295c38362b2cbe',
                    image: '/img/item1.png',
                    price: 100,
                    amount: 2,
                    rated: 3,
                    review: 'good',
                },
                {
                    product_id: '3',
                    product_name: 'Burger with some',
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
    
    // const history = useHistory();
    // const dispatch = useDispatch();
    // const orderList = useSelector(state => state.orderList);
    // const { loading, error, orders } = orderList;
    // useEffect(() => {
    //     if (customer_id) {
    //         dispatch(listOrders(customer_id));
    //     };
    //   }, [dispatch, customer_id]);

    const handleReview = (id) => {
        // dispatch();
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
