import React from "react"
import {
    Switch,
    useRouteMatch,
    Route,
    Redirect
} from "react-router-dom";

import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"

import { actions } from "../store"

// import VendorScreen from "../views/app/customer/vendorScreen";
import AlertScreen from "../views/app/customer/alertScreen";
// import ProductScreen from "../views/app/customer/productScreen";
import OrderHistoryScreen from "../views/app/customer/orderHistoryScreen";
import CustomerProfileScreen from "../views/app/customer/customerProfileScreen";
import CustomerNotificationScreen from "../views/app/customer/customerNotificationScreen";
import History from '../views/app/history'

import AddProduct from '../views/app/product/add'
import Profile from '../views/app/profile'
import ProductList from "../views/app/product/list";
import DailyStockLoad from "../views/app/product/daily-stock"

import AddDriver from '../views/app/vendor/driver/add'
import DriversList from '../views/app/vendor/driver/list'
import InnerPageLayout from "../layout/inner-page-layout";
import VendorProfile from "../views/app/vendor/profile/index"
import DriverProfile from '../views/app/driver/profile'
import SelectRoute from "../views/app/driver/select-route";
import Cart from "../views/app/driver/cart";
import DashboardLayout from "../layout/dashboard-layour";
import SellingCart from "../views/app/vendor/sell/sellingCart";
import BuyingCart from "../views/app/customer/buyingCart";

export default function AppRouter() {
    const match = useRouteMatch()
    const role = useSelector(state => state.user.role)
    return (
        <React.Fragment>{
            role === "driver" ?
                <>
                    <DashboardLayout>
                        <Switch>
                            <Route path={`${match.path}/select-route`}>
                                <SelectRoute />
                            </Route>
                            <Route path={`${match.path}/cart`}>
                                <Cart />
                            </Route>
                            <Route path={`${match.path}/profile`}>
                                <DriverProfile />
                            </Route>
                        </Switch>
                    </DashboardLayout>
                </> :
                role === "vendor" ?
                    <DashboardLayout>
                        <Route path={`${match.path}/product/:id`}>
                            <AddProduct edit={true} />
                        </Route>
                        <Route exact={true} path={`${match.path}/product`}>
                            <AddProduct />
                        </Route>
                        <Route exact={true} path={`${match.path}/products/stock/daily`}>
                            <DailyStockLoad />
                        </Route>
                        <Route exact={true} path={`${match.path}/products`}>
                            <ProductList />
                        </Route>

                <Route exact={true} path={`${match.path}/driver`}>
                    <AddDriver />
                </Route>
                <Route exact={true} path={`${match.path}/drivers`}>
                    <DriversList />
                </Route>
                <Route exact={true} path={`${match.path}/driver/:id`}>
                    <AddDriver />
                </Route>
                <Route path={`${match.path}/profile`}>
                    <VendorProfile />
                </Route>
                <Route path={`${match.path}/selling_cart`}>
                        <SellingCart />
                </Route>
            </DashboardLayout> :
            role === "customer" ?
            <>
            <InnerPageLayout>
                <Switch>
                    <Route path={`${match.path}/history`}>
                        <History />
                    </Route>
                    <Route path={`${match.path}/profile`}>
                        <Profile />
                    </Route>

                                    {/* <Route path={`${match.path}/vendor_:id`} exact>
                    <VendorScreen />
                </Route>
                <Route path={`${match.path}/vendor_:id/product_:pid`} exact>
                    <ProductScreen />
                </Route> */}
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
                    <Route path={`${match.path}/buying_cart`}>
                        <BuyingCart />
                    </Route>
                </Switch>
            </InnerPageLayout>
            </> :
            // <Redirect to="/404" />
            null
        }
        </React.Fragment>
    )
}