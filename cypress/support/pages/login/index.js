import { el } from './elements'
import mainPage from '../main'

class LoginPage {

    constructor() {
        this.mainPage = mainPage
    }

    typeEmail(email) {
        cy.get(el.email).clear().type(email)
    }

    typePassword(pwd) {
        cy.get(el.password).clear().type(pwd)
    }

    clickOnLogin() {
        cy.get(el.loginBtn).click()
    }

    login(email, password) {
        this.typeEmail(email)
        this.typePassword(password)
        this.clickOnLogin()
    }

    errorHasText(text) {
        cy.get(el.errorText).should('have.text', text)
    }
}

export default new LoginPage()