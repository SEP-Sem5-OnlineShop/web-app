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

export default function MainRouter() {
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