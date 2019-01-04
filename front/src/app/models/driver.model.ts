
import { Vehicles } from './vehicle.model'

export interface Driver {
    id?: number
    name?: string
    vehicle_count?: number
    vehicle?: Vehicles
}

export type Drivers = Driver[]
