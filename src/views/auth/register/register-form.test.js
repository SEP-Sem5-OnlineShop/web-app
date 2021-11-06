import {act, render, screen, waitFor} from "@testing-library/react"
import RegisterForm from "./register-form";
import userEvent from "@testing-library/user-event";

describe('Register Form Component',  () => {
    test('on initial render, the submit button should be disabled', async () => {
        render(<RegisterForm />)
        expect(await screen.findByTestId('your-details-button')).toBeEnabled()
    })
    test('after adding correct type of telephone first name, last name and the telephone number ' +
        'the submit button should be enabled', async () => {
        render(<RegisterForm />)
        userEvent.type(screen.getByLabelText(/First Name/i), "fsdaf")
        userEvent.type(screen.getByLabelText(/Last Name/i), "sfdgds")
        userEvent.type(screen.getByLabelText(/Telephone Number/i), "0715645674")

        expect(await screen.findByTestId('password-button')).toBeEnabled()
        await act(async () => {
            userEvent.click(await screen.findByTestId('password-button'))
        })
        userEvent.type(screen.getByLabelText(/Create Password/i), "User123#")
        userEvent.type(screen.getByLabelText(/Confirm Password/i), "User123#")
        expect(await screen.findByTestId('submit-button')).toBeEnabled()

    })
})