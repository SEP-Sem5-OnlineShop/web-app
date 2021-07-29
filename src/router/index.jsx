import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register/index"
import Index from "../views/auth/login/index"
import HomeDsand from "../views/home-dsand";
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'
import History from '../views/app/history'

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
                <Route path="/paymentPopup">
                    <PaymentPopup />
                </Route>
                <Route path="/thankPopup">
                    <ThankPopup />
                </Route>
                <Route path="/history">
                    <History />
                </Route>
            </Switch>
        </Router>
    )
}