'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    var login = function(params) {
        return knex
            .select([
                'users.*',
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
        login,
    }
}
