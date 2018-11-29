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

    var list = function(params) {
        return knex
            .select([
                'superusers.*',
            ])
            .from('superusers')
            .orderBy('superusers.name')
    }

    var find = function(params) {
        return knex
            .select([
                'superusers.*',
            ])
            .from('superusers')
            .where({
                'superusers.name': params.name,
            })
            .orderBy('superusers.name')
    }

    var get = function(params) {
        return knex
            .select([
                'superusers.*',
            ])
            .from('superusers')
            .where({
                'superusers.id': params.id,
            })
            .orderBy('superusers.name')
    }

    var create = function(params) {
        return knex
            .insert({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
            })
            .into('superusers')
    }

    var update = function(params) {
        return knex
            .update({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
            })
            .from('superusers')
            .where({
                id: params.id
            })
    }

    var drop = function(params) {
        return knex
            .del()
            .from('superusers')
            .where({
                id: params.id
            })
    }

    return {
        modelName: "superusers",
        login: login,
        list: list,
        find: find,
        create: create,
        update: update,
        drop: drop
    }
}
