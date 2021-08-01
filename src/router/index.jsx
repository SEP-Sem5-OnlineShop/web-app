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
import RejectPopup from '../views/app/rejectPopup'
import RemovePopup from '../views/app/removePopup'
import History from '../views/app/history'
import Alert from '../views/app/alert'
import HomeAdmin from '../views/home-admin'
// import productList from '../views/app/ProductsList'
import Product from '../views/app/productList'
import VendorProductList from '../views/app/vendorProductList'
import Pizza from '../assets/img/pizza.jpg'
import SingleProduct from '../views/app/singleProduct'


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
                <Route path="/paymentPopup">
                    <PaymentPopup />
                </Route>
                <Route path="/rejectPopup">
                    <RejectPopup />
                </Route>
                <Route path="/removePopup">
                    <RemovePopup />
                </Route>
                <Route path="/Product">
                    <Product />
                </Route>
                <Route path="/thankPopup">
                    <ThankPopup />
                </Route>

                <Route path="/vendorProduct">
                    <VendorProductList />
                </Route>

                <Route path="/SingleProduct">
                    <SingleProduct name='Pizza' img={Pizza} description='ingredients: flour, vegetables, cheese, ketchup, mayoneese'/>
                </Route>


                <Route path="/history">
                    <History />
                </Route><Route path="/alert">
                    <Alert />
                </Route>
                <Route path="/homeAdmin">
                    <HomeAdmin />
                </Route>
                <Route path="/">
                    <HomeDsand />
                </Route>
            </Switch>
        </Router>
    )
}