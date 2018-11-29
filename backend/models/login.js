'use strict'

module.exports = function(knex) {

    var login = function(params) {
        return knex
            .select([
                'superusers.id',
            ])
            .from('superusers')
            .where({
                'superusers.name': params.loginName,
                'superusers.password': params.password,
            })
    }

    return {
        modelName: "login",
        login: login,
    }
}
