import {render,screen,waitFor } from "@testing-library/react"
import LoginForm from "./login-form";
import { Provider } from "react-redux";
import store from "../../../store/index"
import userEvent from "@testing-library/user-event";

describe('Login Form Component',  () => {
    test('on initial render, the submit button should be disabled', async () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        )
        expect(await screen.findByRole('button', {'data-testid': 'login-form-submit'} )).toBeDisabled()
    })
    test('after adding correct type of telephone number and password, ' +
        'the submit button should be enabled', async () => {
        render(
            <Provider store={store}>
                <LoginForm />
            </Provider>
        )
        userEvent.type(screen.getByLabelText(/telephone/i), "0712633374")
        userEvent.type(screen.getByLabelText(/password/i), "User123#")
        expect(await screen.findByRole('button', {'data-testid': 'login-form-submit'} )).toBeEnabled()
    })
    test


})