import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register"
import Login from "../views/auth/login"
import Item from '../views/app/item'
import Home from '../views/app/home'

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
                <Route path="/item">
                    <Item />
                </Route>
                <Route path="/home">
                    <Home />
                </Route>
            </Switch>
        </Router>
    )
}