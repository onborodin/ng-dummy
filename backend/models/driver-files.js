'use strict'

const debug = require('debug')('rpc')

module.exports = function(knex) {

    debug('#load model driver-files')

    function list(params) {
        return knex
            .select([ 
                'files.*',
                'driverFiles.driverId',
                'driverFiles.fileId' 
            ])
            .from('files')
            .innerJoin('driverFiles', 'files.id', 'driverFiles.fileId')
            .where({ 
                'driverFiles.driverId': params.id
            })
    }

    function create(params) {
        return knex
            .insert({
                fileId: params.fileId,
                driverId: params.driverId,
            })
            .into('driverFiles')
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
            .from('driverFiles')
            .where({
                id: params.fileId
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })

    }

    return {
        modelName: "driver-files",
        list,
        create,
        drop
    }
}
