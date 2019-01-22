'use strict'

module.exports = function(knex) {

    var findIn = function(params) {
        return knex
            .select([
                'files.*',
            ])
            .whereIn('id', params.list)
            .from('files')
    }

    var get = function(params) {
        return knex
            .select([
                'files.*',
            ])
            .where({ id: params.id })
            .from('files')
            .limit(1)
            .then((res) => {
                if (res[0]) return res[0]
                return {}
            })
    }


    var list = function(params) {
        return knex
            .select([
                'files.*',
            ])
            .from('files')
            .orderBy('files.blobName')
    }

    var create = function(params) {
        return knex
            .insert(params.list)
            .into('files')
            .returning('id')
    }

    var update = function(params) {
        return knex
            .update({
                name: params.name,
            })
            .from('files')
            .where({
                id: params.id
            })
            .then((res) => {
                if (res > 0) return true
                return false
            })
    }

    var drop = function(params) {
        return knex
            .delete()
            .from('files')
            .where({
                id: params.id
            })
            .then(function(res) {
                if (res > 0) return true
                return false
            })

    }

    return {
        modelName: "files",
        findIn,
        list,
        get,
        create,
        update,
        drop,
    }
}
