'use strict'

module.exports = function(knex) {

    var list = function(params) {
        return knex
            .select([
                'domains.*',
            ])
            .from('domains')
            .orderBy('domains.name')
    }

    var find = function(params) {
        return knex
            .select([
                'domains.*',
            ])
            .from('domains')
            .where({
                'domains.name': params.name,
            })
            .orderBy('domains.name')
    }

    var get = function(params) {
        return knex
            .select([
                'domains.*',
            ])
            .from('domains')
            .where({
                'domains.id': params.id,
            })
            .orderBy('domains.name')
    }

    var create = function(params) {
        return knex
            .insert({
                gecos: params.gecos,
                name: params.name,
            })
            .into('domains')
    }

    var update = function(params) {
        return knex
            .update({
                gecos: params.gecos,
                name: params.name,
            })
            .from('domains')
            .where({
                id: params.id
            })
    }

    var drop = function(params) {
        return knex
            .del()
            .from('domains')
            .where({
                id: params.id
            })
    }

    return {
        modelName: "domains",
        list: list,
        find: find,
        create: create,
        update: update,
        drop: drop
    }
}
