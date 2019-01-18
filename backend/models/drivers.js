'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    var list = function(params) {
        return knex
            //.select([
            //    'drivers.*',
            //])
            //.from('drivers')
            //.orderBy('drivers.name')
            .select(['drivers.*'])
            .count({ vehicle_count: 'connections.driver_id'})
            .from('drivers')
            .leftOuterJoin('connections', 'drivers.id', 'connections.driver_id')
            .groupBy('drivers.id')
            .orderBy('drivers.name')
        }

    var create = function(params) {
        return knex
            .insert({
                name: params.name,
            })
            .into('drivers')
            .then(function(res) {
                if (res.rowCount) {
                    return true
                }
                return false
            })

    }

    var update = function(params) {
        return knex
            .update({
                name: params.name,
            })
            .from('drivers')
            .where({
                id: params.id
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })
    }

    var drop = function(params) {
        return knex
            .delete()
            .from('drivers')
            .where({
                id: params.id
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })

    }

    return {
        modelName: "drivers",
        list,
        create,
        update,
        drop
    }
}
