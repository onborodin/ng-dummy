'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    var list = function(params) {
        return knex
            .select(['drivers.*'])
            .count({ vehicleCount: 'relations.driverId'})
            .count({ filesCount: 'driverFiles.driverId'})
            .from('drivers')
            .leftOuterJoin('relations', 'drivers.id', 'relations.driverId')
            .leftOuterJoin('driverFiles', 'drivers.id', 'driverFiles.driverId')
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
