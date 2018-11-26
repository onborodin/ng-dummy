
'use strict'

module.exports = function(knex) {

    var login = function(params) {
        return knex
            .select([
                'users.id',
            ])
            .from('users')
            .where({
                'users.name': params.loginName,
                'users.password': params.password,
            })
    }

    var list = function(params) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .orderBy('users.name')
    }


    var find = function(params) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .where({
                'users.name': params.name,
            })
            .orderBy('users.name')
    }

    var get = function(params) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .where({
                'users.id': params.id,
            })
            .orderBy('users.name')
    }

    var create = function(params) {
        return knex
            .insert({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
            })
            .into('users')
    }

    var update = function(params) {
        return knex
            .update({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
            })
            .from('users')
            .where({
                id: params.id
            })

    }

    var drop = function(params) {
        return knex
            .del()
            .from('users')
            .where({
                id: params.id
            })
    }

    return {
        login: login,
        list: list,
        find: find,
        create: create,
        update: update,
        drop: drop
    }
}
