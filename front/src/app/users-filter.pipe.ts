import { Pipe, PipeTransform } from '@angular/core';

import { User, Users } from './models/user.model'

@Pipe({
  name: 'usersFilter'
})
export class UsersFilterPipe implements PipeTransform {

  transform(users: Users, search?: string): Users {

    if (search.length === 0) return users

    var regexp = search.toLowerCase()
    var regexpArr = regexp
        .split(/(\s+)/)
        .filter((elem) => { 
            return elem.trim().length > 0
        })

    return users.filter((item: User) => {

        var result: boolean = true
        var name = item.name.toLowerCase()
        var gecos = item.gecos.toLowerCase()

        for (var i = 0; i < regexpArr.length; i++) {

            if (!(name.search(regexpArr[i]) > -1) && !(gecos.search(regexpArr[i]) > -1)) {
                result = false
            }
        }
        return result
    })
  }

}
