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

import AddProduct from '../views/app/product/add/index'
import Profile from '../views/app/profile/index'
import ProductList from "../views/app/product/list";
import DailyStockLoad from "../views/app/product/daily-stock"

import AddDriver from '../views/app/vendor/driver/add'
import DriversList from '../views/app/vendor/driver/list'

export default function AppRouter() {
    const match = useRouteMatch()
    const isLogged = useSelector(state => state.user.token)
    return (
        <Switch>
            {
                isLogged !== "null" ?
                    // true ?
                    <>
                        <Route path={`${match.path}/history`}>
                            <History />
                        </Route>
                        <Route path={`${match.path}/profile`}>
                            <Profile />
                        </Route>
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
                    </> :
                    <Redirect to="/" />
            }
        </Switch>
    )
}