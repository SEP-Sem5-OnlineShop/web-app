describe('Vendor', () => {
    it('vendor can add a new product', () => {
        //go to home page and click login|register button
        cy.visit('http://localhost:3000')
        cy.findByTestId('login-register-button').click()

        //login
        cy.findByLabelText('Telephone Number').type('0712633378')
        cy.findByLabelText('Password').type('User123#')
        cy.findByTestId('login-form-submit').click()

        //click on product list in the side drawer
        cy.findByTestId('product-list').click()

        //click on add new product button
        cy.findByTestId('add-new-product').click()

        //fill the details of the form
        cy.findByLabelText('Name').type('Test Product')
        cy.findByLabelText('Price').type('50.00')
        cy.findByLabelText('Discount').type('7.00')
        cy.get('[contenteditable]').click()
        cy.get('[contenteditable]')
            .type("test")
        //click add vehicle button
        // cy.findByTestId('add-new-product').click()

        Cypress.Commands.add("uploadFile", (selector, fileUrl, type = "") => {
            return cy.get(selector).then(subject => {
                return cy
                    .fixture(fileUrl, "base64")
                    .then(Cypress.Blob.base64StringToBlob)
                    .then(blob => {
                        return cy.window().then(win => {
                            const el = subject[0];
                            const nameSegments = fileUrl.split("/");
                            const name = nameSegments[nameSegments.length - 1];
                            const testFile = new win.File([blob], name, { type });
                            const dataTransfer = new DataTransfer();
                            dataTransfer.items.add(testFile);
                            el.files = dataTransfer.files;
                            return cy.wrap(subject).trigger('change');
                        });
                    });
            });
        });
        cy.uploadFile("input[name=imageFile]", "pouch2.PNG", "image/PNG")

        //click submit button on model
        // cy.findByTestId('submit-button').click()
    })
})