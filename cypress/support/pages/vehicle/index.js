import { el } from './elements'
import loginPage from '../login'
import mainPage from '../main'

class VehiclePage {

    constructor() {
        this.loginPage = loginPage
        this.mainPage = mainPage
    }

    go() {
        cy.login()
        mainPage.clickOnVehicleTab()
        cy.location('pathname').should('contain', '/vehicles')
        cy.get(el.vehiclesContent).should('be.visible')
    }

    addVehicle(name, registration, country) {
        cy.get(el.addVehicle).click()
        this.fillInDataOfNewVehicle(name, registration, country)
        cy.get(el.saveBtn).first().click()
        cy.wait(1000)
    }

    ifNoVehicleThenCreate(name, registration, country) {
        cy.get(el.vehicles).then(veh => {
            if (veh.length == 0) {
                cy.get(el.addVehicle).click()
                this.fillInDataOfNewVehicle(name, registration, country)
                cy.get(el.saveBtn).first().click()
                cy.wait(1000)
            }
        })
    }

    fillInDataOfNewVehicle(name, registration, country) {
        cy.get(el.name).type(name)
        cy.get(el.registration).type(registration)
        cy.get(el.countrySelection).select(country)
    }

    checkVehicleCreated(name, registration) {
        cy.get(el.vehicles).invoke('text').then(v => {
            expect(v).to.contain(name + registration)
        })
    }

    vehicleNotVisible(name, registration) {
        cy.get(el.vehicles).then(v => {
            expect(v).not.to.contain(name + registration)
        })
    }

    returnFirstVehicleName() {
        return cy.get(el.vehicleName).first().then($name => {
            return $name.text()
        })
    }

    returnFirstVehicleRegistration() {
        return cy.get(el.vehicleRegistration).first().then($registration => {
            return $registration.text()
        })
    }

    deleteVehicle() {
        cy.get(el.editBtn).first().click()
        cy.get(el.closePanel).click()
        cy.get(el.deletePopup).should('contain', 'Delete vehicle')
        cy.get(el.deletePopup).should('contain', 'You will no longer be able to park with this vehicle')
        cy.get(el.deletePopup).should('contain', 'Are you sure that you wish to delete it?')
        cy.get(el.deletePopup).find(el.deleteBtn).click()
    }
}

export default new VehiclePage()