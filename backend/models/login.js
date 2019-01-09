'use strict'

module.exports = function(knex) {

    var login = function(params) {
        return knex
            .select([
                'users.name',
                'users.gecos',
                'users.id',
                'users.superuser'
            ])
            .from('users')
            .where({
                'users.name': params.name,
                'users.password': params.password,
            })
            .limit(1)
            .then(function(res) {
                if (res.length) return res[0]
                return {}
            }) 

    }

    return {
        modelName: "login",
        login: login,
    }
}
