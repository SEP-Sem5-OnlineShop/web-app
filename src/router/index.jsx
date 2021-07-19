import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register"

export default function MainRouter() {
    return (
        <Router>
            <Switch>
                <Route path="/register">
                    <Register />
                </Route>
            </Switch>
        </Router>
    )
}