describe('Vendorpage', () => {
    
    it('redender correctly', () => {
        //go to vendor page
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="home-vendor"]').contains('Bakery').click()
        cy.get('[data-testid="vendor-productcomp-6168bac71afcc5082c98f405"]').should("exist")
        cy.get('[data-testid="vendor-productcomp-Bell-6168bac71afcc5082c98f405"]').should("exist")

    })

    it('route to product page', () => {
        //go to vendor page and click product card
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="home-vendor"]').contains('Bakery').click()
        cy.get('[data-testid="vendor-productcomp-6168bac71afcc5082c98f405"]').click()
        cy.url().should("include","vendor_6155816ba9a3231e7874e8e6/product_6168bac71afcc5082c98f405")
    })

    it('customer can set alert for product', () => {
        //go to home page and click login|register button
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="login-register-button"]').click()
        //login
        cy.get('[id="telephone"]').type('0712633371')
        cy.get('[id="password"]').type('User123#')
        cy.get('[type="submit"]').click()
        // go to vendor page and click product card bell button
        cy.get('[data-testid="home-vendor"]').contains('Bakery').click()
        cy.get('[data-testid="vendor-productcomp-Bell-6168bac71afcc5082c98f405"]').click()
        cy.get('[data-testid="vendor-productcomp-Bell-6168bac71afcc5082c98f405"] > svg').should("have.css","color","rgb(255, 193, 7)")
    })
})