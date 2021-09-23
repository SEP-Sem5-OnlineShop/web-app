import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
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

    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    <MainLayout>
                        <HomeDsand />
                    </MainLayout>
                </Route>
                <Route path="/auth">
                    <AuthRouter />
                </Route>
                <Route path="/app">
                    <InnerPageLayout>
                        <AppRouter />
                    </InnerPageLayout>
                </Route>
                <Route path="/404">
                    <InnerPageLayout><Page404 /></InnerPageLayout>
                </Route>
                <Route path={`/register/vendor`}>
                    <InnerPageLayout><VendorRegistration /></InnerPageLayout>
                </Route>
                <Route path={`/vendor_:id`} exact>
                    <InnerPageLayout><VendorScreen /></InnerPageLayout>
                </Route>
                <Route path={`/vendor_:id/product_:pid`} exact>
                    <InnerPageLayout><ProductScreen /></InnerPageLayout>
                </Route>
            </Switch>
        </Router>
    )
}