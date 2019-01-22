'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    debug('#load model users')

    function list (params) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .orderBy('users.name')
    }

    function create(params) {
        return knex
            .insert({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
                superuser: params.superuser,
            })
            .into('users')
            .then(function(res) {
                if (res.rowCount) {
                    return true
                }
                return false
            })

    }

    function update(params) {
        return knex
            .update({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
                superuser: params.superuser,
            })
            .from('users')
            .where({
                id: params.id
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })
    }

    function drop(params) {
        return knex
            .delete()
            .from('users')
            .where({
                id: params.id
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })

    }

    return {
        modelName: "users",
        list,
        create,
        update,
        drop
    }
}
