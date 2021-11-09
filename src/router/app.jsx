import React from "react"
import {
    Switch,
    useRouteMatch,
    Route,
    Redirect
} from "react-router-dom";

import { useSelector } from "react-redux"

import AlertScreen from "../views/app/customer/alertScreen";
import OrderHistoryScreen from "../views/app/customer/orderHistoryScreen";

import AddProduct from '../views/app/product/add'
import Profile from '../views/app/profile'
import ProductList from "../views/app/product/list";

import AddDriver from '../views/app/vendor/driver/add'
import DriversList from '../views/app/vendor/driver/list'

import VehiclesList from "../views/app/vendor/vehicle/list";

import InnerPageLayout from "../layout/inner-page-layout";
import VendorProfile from "../views/app/vendor/profile/index"
import DriverProfile from '../views/app/driver/profile'
import SelectRoute from "../views/app/driver/select-route";
import Cart from "../views/app/driver/cart";
import DashboardLayout from "../layout/dashboard-layout";
import SellingCart from "../views/app/driver/sell/sellingCart";
import BuyingCart from "../views/app/customer/buyingCart";
import AddVehicle from "../views/app/vendor/vehicle/add";
import DailyWork from "../views/app/vendor/daily-work";
import VendorReport from "../views/app/vendor/reports/vendorReport";

export default function AppRouter() {
    const match = useRouteMatch()
    const role = useSelector(state => state.user.role)
    const isLogin = useSelector(state => state.user.isLogin)
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
                            <Route path={`${match.path}/selling_cart`}>
                                <SellingCart />
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
                            <DailyWork />
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
                        <Route path={`${match.path}/vehicles`}>
                            <VehiclesList />
                        </Route>
                        <Route exact={true} path={`${match.path}/vehicle`} >
                            <AddVehicle />
                        </Route>
                        <Route exact={true} path={`${match.path}/vehicle/:id`} >
                            <AddVehicle />
                        </Route>
                        <Route exact={true} path={`${match.path}/reports`} >
                            <VendorReport />
                        </Route>
                    </DashboardLayout> :
            role === "customer" ?
            <>
            <InnerPageLayout>
                <Switch>
                    <Route path={`${match.path}/profile`}>
                        <Profile />
                    </Route>
                    <Route path={`${match.path}/alert`}>
                        <AlertScreen />
                    </Route>
                    <Route path={`${match.path}/order_history`}>
                        <OrderHistoryScreen />
                    </Route>
                    <Route path={`${match.path}/buying_cart`}>
                        <BuyingCart />
                    </Route>
                </Switch>
            </InnerPageLayout>
            </> :
            <Redirect to="/" />
            // null
        }
        </React.Fragment>
    )
}