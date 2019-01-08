import { Pipe, PipeTransform } from '@angular/core'

import { Driver, Drivers } from './models/driver.model'

@Pipe({
  name: 'driversFilter'
})
export class DriversFilterPipe implements PipeTransform {

    transform(drivers: Drivers, search?: string): Drivers {

        if (search.length === 0) { 
            return drivers 
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

        return drivers.filter((item: Driver) => {

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
