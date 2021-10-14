import React, { useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomeDsand from "../views/home-dsand";
import AppRouter from "./app";
import AuthRouter from "./auth";
import MainLayout from "../layout/home-layout";
import InnerPageLayout from "../layout/inner-page-layout"
import VendorRegistration from '../views/app/vendor/register/index'
import ProductScreen from "../views/app/customer/productScreen";
import VendorScreen from "../views/app/customer/vendorScreen";
import Page404 from "../views/404"
import { actions } from "../store"
import DashboardLayout from "../layout/dashboard-layout";
import Dashboard from "../views/app/driver/dashboard";
import VendorDashboard from "../views/app/vendor/dashboard/index"
import CreatePassword from "../views/other/create-password";
import {alertSocket} from "../socket";

export default function MainRouter() {

    const dispatch = useDispatch()

    useEffect(() => {
        // Set language when page refreshing
        const selectedLanguage = window.localStorage.getItem("language")
        dispatch(actions.language.setLanguage(selectedLanguage))

        // Set user data, token and role when page refreshing
        const userData = JSON.parse(window.localStorage.getItem("userData"))
        const token = window.localStorage.getItem("token")
        const role = window.localStorage.getItem("role")
        const isLogin = window.localStorage.getItem("isLogin")
        dispatch(actions.user.setUserData(userData))
        dispatch(actions.user.setAuthToken(token))
        dispatch(actions.user.setRole(role))
        dispatch(actions.user.setIsLogin(isLogin))
        if(userData) {
            alertSocket.auth = {role}
            alertSocket.connect();
            alertSocket.emit("join", {userId: userData._id || ""})
        }

    }, [dispatch])
    const role = useSelector(state => state.user.role)
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {
                        role === "vendor" ?
                        <DashboardLayout>
                            <VendorDashboard />
                        </DashboardLayout> :
                        role === "driver" ?
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout> :
                        <MainLayout>
                            <HomeDsand/>
                        </MainLayout>
                    }
                </Route>
                <Route path="/auth">
                    <AuthRouter />
                </Route>
                <Route path="/app">
                    <AppRouter />
                </Route>
                <InnerPageLayout>
                    <Switch>
                        <Route path="/404">
                            <Page404 />
                        </Route>
                        <Route path="/create_password/:token">
                            <CreatePassword />
                        </Route>
                        <Route path={"/register/vendor/:token"}>
                            <VendorRegistration />
                        </Route>
                        <Route exact={true} path={`/register/vendor`}>
                            <VendorRegistration />
                        </Route>
                        <Route path={`/vendor_:id`} exact>
                            <VendorScreen />
                        </Route>
                        <Route path={`/vendor_:id/product_:pid`} exact>
                            <ProductScreen />
                        </Route>
                    </Switch>
                </InnerPageLayout>
            </Switch>
        </Router>
    )
}