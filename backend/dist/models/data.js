'use strict';
module.exports = function (knex) {
    var findIn = function (params) {
        return knex
            .select([
            'data.*',
        ])
            .whereIn('id', params.list)
            .from('data');
    };
    var get = function (params) {
        return knex
            .select([
            'data.*',
        ])
            .where({ id: params.id })
            .from('data')
            .limit(1)
            .then((res) => {
            if (res[0])
                return res[0];
            return {};
        });
    };
    var list = function (params) {
        return knex
            .select([
            'data.*',
        ])
            .from('data')
            .orderBy('data.blobName');
    };
    var create = function (params) {
        return knex
            .insert(params.list)
            .into('data')
            .returning('id');
    };
    var update = function (params) {
        return knex
            .update({
            name: params.name,
        })
            .from('data')
            .where({
            id: params.id
        })
            .then((res) => {
            if (res > 0)
                return true;
            return false;
        });
    };
    var drop = function (params) {
        return knex
            .delete()
            .from('data')
            .where({
            id: params.id
        })
            .then(function (res) {
            if (res > 0)
                return true;
            return false;
        });
    };
    return {
        modelName: "data",
        findIn,
        list,
        get,
        create,
        update,
        drop,
    };
};
