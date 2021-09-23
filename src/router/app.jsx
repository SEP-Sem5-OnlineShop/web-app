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

export default function AppRouter() {
    const match = useRouteMatch()

    React.useEffect(() => {
        // Set language when page refreshing
        const selectedLanguage = window.localStorage.getItem("language")
        dispatch(actions.language.setLanguage(selectedLanguage))

        // Set user data, token and role when page refreshing
        const userData = JSON.parse(window.localStorage.getItem("userData"))
        const token = window.localStorage.getItem("token")
        const role = window.localStorage.getItem("role")
        dispatch(actions.user.setUserData(userData))
        dispatch(actions.user.setAuthToken(token))
        dispatch(actions.user.setRole(role))

    }, [])
    const isLogged = useSelector(state => state.user.token)

    const dispatch = useDispatch()
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
                        <Route path={`${match.path}/product/add`}>
                            <AddProduct />
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