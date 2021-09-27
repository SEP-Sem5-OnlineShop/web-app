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
import DashboardLayout from "../layout/dashboard-layour";
import Dashboard from "../views/app/driver/dashboard";

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

    }, [dispatch])
    const role = useSelector(state => state.user.role)
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {
                        role === "guest" || role === "customer" ?
                        <MainLayout>
                            <HomeDsand/>
                        </MainLayout> :
                        <DashboardLayout>
                            <Dashboard />
                        </DashboardLayout>
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