'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    debug('#load model vehicle-files')

    function list(params) {
        return knex
            .select([
                'vehicleFiles.*',
            ])
            .from('vehicleFiles')
            .where({ 
                vehicleId: params.vehicleId 
            })
    }

    function create(params) {
        return knex
            .insert({
                fileId: params.fileId,
                vehicleId: params.vehicleId,
            })
            .into('vehicleFiles')
            .then(function(res) {
                if (res.rowCount) {
                    return true
                }
                return false
            })

    }

    function drop(params) {
        return knex
            .delete()
            .from('vehicleFiles')
            .where({
                id: params.fileId
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })

    }

    return {
        modelName: "vehicle-files",
        list,
        create,
        drop
    }
}
