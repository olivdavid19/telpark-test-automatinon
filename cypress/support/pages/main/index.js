import { el } from './elements'

class MainPage {
    acceptCookies() {
        cy.get(el.acceptCookiesBtn).click()
    }
    
    checkMainPageElements() {
        this.acceptCookies()
        cy.location('pathname').should('contain', '/parking_pass')
        cy.get(el.header).should('be.visible')
        cy.get(el.logout).should('be.visible')
        cy.get(el.messenger).should('be.visible')
    }

    clickOnVehicleTab() {
        cy.get(el.vehicleTab).click()
    }
}

export default new MainPage()