/* eslint-disable no-undef */
describe('Homepage', () => {
    it('redender correctly', () => {
        //go to home page
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="login-register-button"]').should("exist")
        cy.get('[data-testid="home-vendor"]').should("exist")

    })

    it('route to vendor page', () => {
        //go to home page and click vendor card
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="home-vendor"]').contains('Bakery').click()
        cy.url().should("include","/vendor_6155816ba9a3231e7874e8e6")
    })

    it('route to login page', () => {
        //go to home page and click login|register button
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="login-register-button"]').click()
        cy.url().should("include","/auth/login")
    })
})