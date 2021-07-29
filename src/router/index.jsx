import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register"
import Login from "../views/auth/login"
import Alert from '../views/app/alert'

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
            </Switch>
        </Router>
    )
}