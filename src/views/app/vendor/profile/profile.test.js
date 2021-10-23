import {act, render, screen, waitFor} from "@testing-library/react"
import Profile from "./index";
import { Provider } from "react-redux";
import store from "../../../../store/index"
import userEvent from "@testing-library/user-event";

describe('Profile Component',  () => {
    test('on initial render, all the input fields must be disabled', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        )
        expect(screen.getByLabelText(/First Name/i)).toBeDisabled()
        expect(screen.getByLabelText(/Last Name/i)).toBeDisabled()
        expect(screen.getByLabelText(/Shop Name/i)).toBeDisabled()
        expect(screen.getByLabelText(/Telephone/i)).toBeDisabled()
        expect(screen.getByLabelText(/Email/i)).toBeDisabled()
        expect(screen.getByLabelText(/Permit Number/i)).toBeDisabled()
    })
    test('after click update details button first three input fields should be enabled', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        )
        userEvent.click(screen.getByTestId('update-details-button'))
        expect(screen.getByLabelText(/First Name/i)).toBeEnabled()
        expect(screen.getByLabelText(/Last Name/i)).toBeEnabled()
        expect(screen.getByLabelText(/Shop Name/i)).toBeEnabled()
    })
    test('submit button should be disabled if there is no touch of the input fields', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        )
        userEvent.click(screen.getByTestId('update-details-button'))
        expect(screen.getByTestId('submit-button')).toBeDisabled()
    })
    test('submit button should be disabled if the fields are empty in first rows', async () => {
        render(
            <Provider store={store}>
                <Profile />
            </Provider>
        )
        act(() => {
            userEvent.click(screen.getByTestId('update-details-button'))
            userEvent.type(screen.getByLabelText(/First Name/i), '')
            userEvent.type(screen.getByLabelText(/Last Name/i), '')
            userEvent.type(screen.getByLabelText(/Shop Name/i), '')
        })
        expect(screen.getByTestId('submit-button')).toBeDisabled()
    })
})