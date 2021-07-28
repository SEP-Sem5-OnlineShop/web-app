import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register"
import Login from "../views/auth/login"
import Alert from '../views/app/alert'
import AlertComponent from '../views/app/alertComponent'
import Vendor from '../views/app/vendor'
import VendorComponent from '../views/app/vendorComponent'

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
                <Route path="/alert">
                    <Alert />
                </Route>
                <Route path="/alertCom">
                    <AlertComponent />
                </Route>
                <Route path="/vendor">
                    <Vendor />
                </Route>
                <Route path="/vendorCom">
                    <VendorComponent />
                </Route>
            </Switch>
        </Router>
    )
}