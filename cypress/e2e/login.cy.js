import { faker } from '@faker-js/faker'
import loginPage from '../support/pages/login'

describe('Given user is at Login page', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  context('When login with valid credentials', () => {
    it('Then user is at main page', () => {
      loginPage.login(Cypress.env('email'), Cypress.env('pwd'))
      loginPage.mainPage.checkMainPageElements()
    })
  })

  context('When login with invalid credentials', () => {
    it('Then an invalid credentials error is displayed', () => {
      loginPage.login(faker.internet.email(), faker.internet.password())
      loginPage.errorHasText('Invalid username or password.')
    })
  })

  context('When login without filling in the credentials', () => {
    it('Then an invalid credentials error is displayed', () => {
      loginPage.clickOnLogin()
      loginPage.errorHasText('Invalid username or password.')
    })
  })
})