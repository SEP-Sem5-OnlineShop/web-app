describe('Vendor', () => {
    it('vendor can add a new product', () => {
        //go to home page and click login|register button
        cy.visit('http://localhost:3000')
        cy.findByTestId('login-register-button').click()

        //login
        cy.findByLabelText('Telephone Number').type('0712633378')
        cy.findByLabelText('Password').type('User123#')
        cy.findByTestId('login-form-submit').click()

        //click on driver list in the side drawer
        cy.findByTestId('drivers-list').click()

        //click on add new product button
        cy.findByTestId('add-new-driver').click()

        //fill the details of the form
        cy.findByLabelText('First Name').type('first name')
        cy.findByLabelText('Last Name').type('last name')
        cy.findByLabelText('Telephone Number').type('0751236547')
        cy.findByLabelText('Email').type('fnamelname@gmail.com')
        cy.findByLabelText('License Number').type('123456789V')

        //click on submit button
        cy.findByTestId('submit-button').click()
    })
})