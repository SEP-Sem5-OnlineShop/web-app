import {
    Switch,
    useRouteMatch,
    Route,
} from "react-router-dom";
import Register from "../views/auth/register/index"
import Login from "../views/auth/login/index"

export default function AuthRouter() {
    const match = useRouteMatch()

    return (
        <Switch>
            <Route path={`${match.path}/register`}>
                <Register />
            </Route>
            <Route path={`${match.path}/login`}>
                <Login />
            </Route>
        </Switch>
    )
}