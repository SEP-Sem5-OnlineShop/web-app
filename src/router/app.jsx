import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'
import History from '../views/app/history'
import Alert from '../views/app/alert'
import Profile from "../views/app/profile";
import VendorRegistration from "../views/app/admin/vendor-registration";

export default function AppRouter() {
    const match = useRouteMatch()
    return (
        <Switch>
            <Route path={`${match.path}/paymentPopup`}>
                <PaymentPopup />
            </Route>
            <Route path={`${match.path}/thankPopup`}>
                <ThankPopup />
            </Route>
            <Route path={`${match.path}/history`}>
                <History />
            </Route>
            <Route path={`${match.path}/alert`}>
                <Alert />
            </Route>
            <Route path={`${match.path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${match.path}/register/vendor`}>
                <VendorRegistration />
            </Route>
        </Switch>
    )
}