import React from "react"
import {
    Switch,
    useRouteMatch,
    Route,
    Redirect
} from "react-router-dom";

import { useSelector } from "react-redux"
import Cart from "../views/app/driver/cart";
import Profile from "../views/app/driver/profile";
import SelectRoute from "../views/app/driver/select-route";
import AlertPopup from "../views/app/driver/alert-popup";

export default function DriverRouter() {
    const match = useRouteMatch()
    const role = useSelector(state => state.user.role)
    return (
        <Switch>
            <Route path={`${match.path}/cart`}>
                <Cart />
            </Route>
            <Route path={`${match.path}/profile`}>
                <Profile />
            </Route>
            <Route path={`${match.path}/select-route`}>
                <SelectRoute />
            </Route>
            <Route path={`${match.path}/alert-popup`}>
                <AlertPopup />
            </Route>
        </Switch>
    )
}