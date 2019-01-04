import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subject, Observable } from 'rxjs'

import { fadeAnimation } from '../app.animations'

import { RPCService, RPCResponce, RPCError } from '../rpc.service'
import { VehiclesService } from '../vehicles.service'
import { Vehicle, Vehicles } from '../models/vehicle.model'

export enum Form {
    all = 0,
    createVehicle = 1,
    updateVehicle = 2,
    dropVehicle = 3,
    listVehicles = 4
}

export enum Action {
    closeAll = 0,
    open = 1,
    close = 2,
    update = 3
}

export interface Event {
    destination: Form
    action: Action
}

@Component({
    selector: 'vehicles',
    templateUrl: './vehicles.component.html',
    styleUrls: [ './vehicles.component.scss' ],
    animations: [ fadeAnimation ]
})
export class VehiclesComponent implements OnInit {

    vehicles: Vehicle[] = []
    vehicle: Vehicle = { id: -1, name: '' }
    timestamp: Date
    alertMessage: string = ''

    search: string = ''

    subject: Subject<Event>
    subscription: any

    constructor(private vehiclesService: VehiclesService) {
        this.subject = new Subject<Event>()
        this.subscription = this.subject.subscribe((event: Event) => {
            if (event.destination == Form.listVehicles) {
                if (event.action == Action.update) {
                    this.getList()
                }
            }
        })
    }


    showAlertMessage(message: string) {
        this.alertMessage = message
        setTimeout(() => {
            this.alertMessage = ''
        }, 30000)
    }


    createVehicle() {
        this.subject.next({ 
            destination: Form.createVehicle,
            action: Action.open 
        })
    }

    dropVehicle(vehicle) {
        this.vehicle = vehicle
        this.subject.next({ 
            destination: Form.dropVehicle,
            action: Action.open
        })
    }

    updateVehicle(vehicle) {
        this.vehicle = vehicle
        this.subject.next({ 
            destination: Form.updateVehicle,
            action: Action.open
        })
    }

    getList() {
        this.vehiclesService
            .list()
            .subscribe(
                (res: RPCResponce<Vehicle[]>) => {
                    this.vehicles = res.result
                    this.timestamp = new Date()
                },
                (err) => {
                    this.showAlertMessage('Backend error')
                    console.log(err)
                }
            )
    }

    ngOnInit() {
        this.getList()
    }
}
