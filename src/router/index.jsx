import React, {useEffect} from "react"
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
import {actions} from "../store"

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
        dispatch(actions.user.setUserData(userData))
        dispatch(actions.user.setAuthToken(token))
        dispatch(actions.user.setRole(role))

    }, [])
  
    return (
        <Router>
            <Switch>
                <Route path="/auth">
                    <AuthRouter />
                </Route>
                <Route path="/app">
                    <InnerPageLayout>
                        <AppRouter />
                    </InnerPageLayout>
                </Route>
                <Route path="/">
                    <MainLayout>
                        <HomeDsand />
                    </MainLayout>
                </Route>
            </Switch>
        </Router>
    )
}