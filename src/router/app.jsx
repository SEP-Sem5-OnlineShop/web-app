import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";

import VendorScreen from "../views/app/customer/vendorScreen";
import AlertScreen from "../views/app/customer/alertScreen";
import ProductScreen from "../views/app/customer/productScreen";
import OrderHistoryScreen from "../views/app/customer/OrderHistoryScreen";
import CustomerProfileScreen from "../views/app/customer/CustomerProfileScreen";
import CustomerNotificationScreen from "../views/app/customer/CustomerNotificationScreen";


import History from '../views/app/history'
import Profile from '../views/app/profile/index'
import VendorRequestList from '../views/app/vendorRequestList'
import VendorComponent from '../components/Admin/vendorComponent'
import HomeAdmin from '../views/home-admin'
import Product from '../views/app/productList'
import VendorProductList from '../views/app/vendorProductList'
import AddProduct from '../views/app/product/add/index'
import VendorRegistration from '../views/app/vendor/register/index'
import SingleProduct from '../views/app/singleProduct'

import ThankPopup from '../views/app/thankPopup'
import PaymentPopup from '../views/app/paymentPopup'
import RejectPopup from '../views/app/rejectPopup'
import RemovePopup from '../views/app/removePopup'
import Toggle from '../views/app/toggleButton'
// import productList from '../views/app/ProductsList'
import Pizza from '../assets/img/pizza.jpg'


export default function AppRouter() {
    const match = useRouteMatch()
    return (
        <Switch>
            
            <Route path={`${match.path}/vendor_:id`} exact>
                <VendorScreen />
            </Route>
            <Route path={`${match.path}/vendor_:id/product_:id`}>
                <ProductScreen />
            </Route>
            <Route path={`${match.path}/alert`}>
                <AlertScreen />
            </Route>
            <Route path={`${match.path}/order_history`}>
                <OrderHistoryScreen />
            </Route>
            <Route path={`${match.path}/customer_profile`}>
                <CustomerProfileScreen />
            </Route>
            <Route path={`${match.path}/customer_notification`}>
                <CustomerNotificationScreen />
            </Route>




            <Route path={`${match.path}/Product`}>
                <Product />
            </Route>
            <Route path={`${match.path}/vendor_:id/product`}>
                <SingleProduct name='Pizza' img={Pizza} description='ingredients: flour, vegetables, cheese, ketchup, mayoneese'/>
            </Route>
            <Route path={`${match.path}/history`}>
                <History />
            </Route>
            <Route path={`${match.path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${match.path}/register/vendor`}>
                <VendorRegistration />
            </Route>
            <Route path={`${match.path}/product/add`}>
                <AddProduct />
            </Route>
            <Route path={`${match.path}/VendorProductList`}>
                <VendorProductList />
            </Route>
            <Route path={`${match.path}/VendorRequestList`}>
                <VendorRequestList />
            </Route>

            <Route path={`${match.path}/rejectPopup`}>
                <RejectPopup />
            </Route>
            <Route path={`${match.path}/RemovePopup`}>
                <RemovePopup />
            </Route>
            <Route path={`${match.path}/toggleButton`}>
                <Toggle />
            </Route>
           <Route path={`${match.path}/paymentPopup`}>
                <PaymentPopup />
            </Route>
            <Route path={`${match.path}/thankPopup`}>
                <ThankPopup />
            </Route>
            
        </Switch>
    )
}