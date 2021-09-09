import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'
import History from '../views/app/history'
import VendorScreen from "../views/app/vendorScreen";
import AlertScreen from "../views/app/alertScreen";
import ProductScreen from "../views/app/productScreen";

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
                <AlertScreen />
            </Route>
            <Route path={`${match.path}/vendor_:id`} exact>
                <VendorScreen />
            </Route>
            <Route path={`${match.path}/vendor_:id/product_:pid`} exact>
                <ProductScreen />
            </Route>
        </Switch>
    )
}