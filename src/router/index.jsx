import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register"
import Login from "../views/auth/login"
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'

export default function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/paymentPopup">
                    <PaymentPopup />
                </Route>
                <Route path="/thankPopup">
                    <ThankPopup />
                </Route>
            </Switch>
        </Router>
    )
}