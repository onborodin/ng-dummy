
import { Vehicles } from './vehicle.model'

export interface Driver {
    id?: number
    name?: string
    vehicleCount?: number
    fileCount?: number
    createdAt?: string
    updatedAt?: string

}

export type Drivers = Driver[]
