'use strict'

module.exports = function(knex) {

    var login = function(params) {
        return knex
            .select([
                'superusers.id'
            ])
            .from('superusers')
            .where({
                'superusers.name': params.name,
                'superusers.password': params.password,
            })
    }

    var check = function(params) {
        return knex
            .select([
                'superusers.id',
            ])
            .from('superusers')
            .where({
                'superusers.id': params.id
            })
    }

    return {
        modelName: "login",
        login: login,
        check: check
    }
}
