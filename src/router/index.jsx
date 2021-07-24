import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register/index"
import Index from "../views/auth/login/index"
import HomeDsand from "../views/home-dsand";

export default function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Index />
                </Route>
                <Route path="/">
                    <HomeDsand />
                </Route>
            </Switch>
        </Router>
    )
}