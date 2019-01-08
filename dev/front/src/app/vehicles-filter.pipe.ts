import { Pipe, PipeTransform } from '@angular/core'

import { Vehicle, Vehicles } from './models/vehicle.model'

@Pipe({
  name: 'vehiclesFilter'
})
export class VehiclesFilterPipe implements PipeTransform {

    transform(vehicles: Vehicles, search?: string): Vehicles {

        if (search.length === 0) { 
            return vehicles 
        }

        var regexp = search.toLowerCase() //.replace(/[\[\]&\/\\,+()$~%'":;*?<>{}]/g, '')

        try {
            new RegExp(regexp)
        }
        catch {
            return []
        }

        var regexpArr = regexp
            .split(/(\s+)/)
            .filter((elem) => { 
                return elem.trim().length > 0
            })

        return vehicles.filter((item: Vehicle) => {

            var result: boolean = true
            var name = item.name.toLowerCase()

            for (var i = 0; i < regexpArr.length; i++) {

                if (!(name.search(regexpArr[i]) > -1)) {
                    result = false
                }
            }
            return result
        })
    }
}
