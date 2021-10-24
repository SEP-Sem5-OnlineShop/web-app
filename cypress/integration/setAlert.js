describe('Customer', () => {
    it('customer can add set alert for product', () => {
        //go to home page and click login|register button
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="login-register-button"]').click()

        //login
        cy.get('[id="telephone"]').type('0712633371')
        cy.get('[id="password"]').type('User123#')
        cy.get('[type="submit"]').click()

        cy.get('[data-testid="home-vendor"]').contains('Bakery').click()
        cy.get('[data-testid="vendor-productcomp-Bell-6168bac71afcc5082c98f405"]').click()
    })
})