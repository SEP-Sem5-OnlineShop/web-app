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