import loginPage from '../support/pages/login'
import mainPage from '../support/pages/main'

//This command will do the complete login flow
Cypress.Commands.add('login', function () {
    cy.visit('/')
    loginPage.login(Cypress.env('email'), Cypress.env('pwd'))
    mainPage.checkMainPageElements()
})