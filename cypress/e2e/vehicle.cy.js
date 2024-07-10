import { faker } from '@faker-js/faker'
import vehiclePage from '../support/pages/vehicle'

describe('Given user is at vehicle page', () => {
    const vehicle = {
        model: faker.vehicle.model(),
        registration: faker.vehicle.vrm(),
        country: 'Outro',
    }

    beforeEach(() => {
        vehiclePage.go()
    })

    context('When add a vehicle for the country "Other"', () => {
        it('Then vehicle is created', () => {
            vehiclePage.addVehicle(vehicle.model, vehicle.registration, vehicle.country)
            vehiclePage.checkVehicleCreated(vehicle.model, vehicle.registration)
        })
    })

    context('When remove a vehicle', () => {
        beforeEach(() => {
            vehiclePage.ifNoVehicleThenCreate(vehicle.model, vehicle.registration, vehicle.country)
        })

        it('Then vehicle is no longer on vehicle page', () => {
            vehiclePage.returnFirstVehicleName().then(name => {
                vehiclePage.returnFirstVehicleRegistration().then(registration => {
                    vehiclePage.deleteVehicle()
                    vehiclePage.vehicleNotVisible(name, registration)
                })
            })
        })
    })
})