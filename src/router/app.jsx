import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'
import History from '../views/app/history'
import VendorScreen from "../views/app/vendorScreen";
import AlertScreen from "../views/app/alertScreen";
import ProductScreen from "../views/app/productScreen";

import VendorRequestList from '../views/app/vendorRequestList'

import VendorComponent from '../components/Admin/vendorComponent'

import RejectPopup from '../views/app/rejectPopup'
import RemovePopup from '../views/app/removePopup'

import Toggle from '../views/app/toggleButton'
import HomeAdmin from '../views/home-admin'
// import productList from '../views/app/ProductsList'
import Product from '../views/app/productList'
import VendorProductList from '../views/app/vendorProductList'
import Pizza from '../assets/img/pizza.jpg'
import SingleProduct from '../views/app/product/single/singleProduct'
import AddProduct from '../views/app/product/add/index'
import Profile from '../views/app/profile/index'
import VendorRegistration from '../views/app/vendor/register/index'

export default function AppRouter() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/paymentPopup`}>
                <PaymentPopup />
            </Route>
            <Route path={`${match.path}/thankPopup`}>
                <ThankPopup />
            </Route>
            <Route path={`${match.path}/history`}>
                <History />
            </Route>
            <Route path={`${match.path}/alert`}>
                <AlertScreen />
            </Route>
            <Route path={`${match.path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${match.path}/vendor_:id`} exact>
                <VendorScreen />
            </Route>
            <Route path={`${match.path}/register/vendor`}>
                <VendorRegistration />
            </Route>
            <Route path={`${match.path}/product/add`}>
                <AddProduct />
            </Route>

            <Route path={`${match.path}/toggleButton`}>
                <Toggle />
            </Route>

            <Route path={`${match.path}/VendorRequestList`}>
                <VendorRequestList />

            </Route>

            <Route path={`${match.path}/VendorComponent`}>
                <VendorComponent />

            </Route>





            <Route path={`${match.path}/rejectPopup`}>
                <RejectPopup />
            </Route>
            <Route path={`${match.path}/RemovePopup`}>
                <RemovePopup />
            </Route>
            <Route path={`${match.path}/Product`}>
                <Product />
            </Route>


            <Route path={`${match.path}/VendorProductList`}>
                <VendorProductList />
            </Route>

            <Route path={`${match.path}/vendor_:id/product_:id`}>
                <SingleProduct name='Pizza' img={Pizza} description='ingredients: flour, vegetables, cheese, ketchup, mayoneese' />
            </Route>



        </Switch>
    )
}