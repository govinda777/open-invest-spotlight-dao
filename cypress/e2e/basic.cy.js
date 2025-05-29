describe('Basic Application Test', () => {
  beforeEach(() => {
    // Prevent Cypress from failing tests on uncaught exceptions from your app
    cy.on('uncaught:exception', (err) => {
      // returning false here prevents Cypress from failing the test
      return false
    })
  })

  it('should load the home page', () => {
    cy.visit('/')
    cy.get('body').should('exist')
  })
}) 