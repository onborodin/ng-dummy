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
    }

    var check = function(params) {
        return knex
            .select([
                'users.id',
            ])
            .from('users')
            .where({
                'users.id': params.id
            })
    }

    return {
        modelName: "login",
        login: login,
        check: check
    }
}
