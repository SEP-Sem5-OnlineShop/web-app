import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import HomeDsand from "../views/home-dsand";
import AppRouter from "./app";
import AuthRouter from "./auth";
import MainLayout from "../layout/main-layout";

export default function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/auth">
                    <AuthRouter />
                </Route>
                <Route path="/app">
                    <MainLayout>
                        <AppRouter />
                    </MainLayout>
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