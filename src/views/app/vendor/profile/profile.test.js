import {render,screen,waitFor } from "@testing-library/react"
import Profile from "./index";
import { Provider } from "react-redux";
import store from "../../../../store/index"
import userEvent from "@testing-library/user-event";

describe('Profile Component',  () => {
    test('on initial render, the submit button should be disabled', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        )
        expect(await screen.findByRole('button', {'data-testid': 'login-form-submit'} )).toBeDisabled()
    })


})