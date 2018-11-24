
'use strict'

module.exports = function(knex) {

    var login = function(params, callback) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .where({
                'users.name': params.userName,
                'users.password': params.password,
            })
            .then(function(res) {
                callback(null, res)
            })
    }

    var list = function(params, callback) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .orderBy('users.name')
            .then(function(res) {
                callback(null, res)
            })
    }


    var find = function(params, callback) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .where({
                'users.name': params.name,
            })
            .orderBy('users.name')
            .then(function(res) {
                callback(null, res)
            })
    }

    var get = function(params, callback) {
        return knex
            .select([
                'users.*',
            ])
            .from('users')
            .where({
                'users.id': params.id,
            })
            .orderBy('users.name')
            .then(function(res) {
                callback(null, res)
            })
    }

    var create = function(params, callback) {
        return knex
            .insert({
                gecos: params.gecos,
                name: params.name,
                password: params.password,
            })
            .into('users')
            .then(function(res) {
                callback(null, res)
            })
    }

    var update = function(params, callback) {
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
            .then(function(res) {
                callback(null, res)
            })

    }

    var drop = function(params, callback) {
        return knex
            .del()
            .from('users')
            .where({
                id: params.id
            })
            .then(function(res) {
                callback(null, res)
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
