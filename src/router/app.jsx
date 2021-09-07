import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import PaymentPopup from '../views/app/paymentPopup'
import ThankPopup from '../views/app/thankPopup'
import History from '../views/app/history'
import Alert from '../views/app/alert'

import VendorRequestList from '../views/app/vendorRequestList'

import VendorComponent from '../components/Admin/vendorComponent'

import RejectPopup from '../views/app/rejectPopup'
import RemovePopup from '../views/app/removePopup'

import Toggle from '../views/app/toggleButton'
import HomeAdmin from '../views/home-admin'
// import productList from '../views/app/ProductsList'
import Product from '../views/app/productList'
import VendorProductList from '../views/app/vendorProductList'
import Pizza from '../assets/img/pizza.jpg'
import SingleProduct from '../views/app/singleProduct'

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

            <Route path={`${match.path}/toggleButton`}>
                <Toggle />
            </Route>

            <Route path={`${match.path}/VendorRequestList`}>
                <VendorRequestList />
                
            </Route>

            <Route path={`${match.path}/VendorComponent`}>
                <VendorComponent />
                
            </Route>


    
               
              
                <Route path={`${match.path}/rejectPopup`}>
                    <RejectPopup />
                </Route>
                <Route path={`${match.path}/RemovePopup`}>
                    <RemovePopup />
                </Route>
                <Route path={`${match.path}/Product`}>
                    <Product />
                </Route>
                

                <Route path={`${match.path}/VendorProductList`}>
                    <VendorProductList />
                </Route>

                <Route path={`${match.path}/SingleProduct`}>
                    <SingleProduct name='Pizza' img={Pizza} description='ingredients: flour, vegetables, cheese, ketchup, mayoneese'/>
                </Route>



        </Switch>
    )
}