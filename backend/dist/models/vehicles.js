'use strict';
const debug = require('debug')('rpc');
module.exports = function (knex) {
    var list = function (params) {
        return knex
            .select([
            'vehicles.*',
        ])
            .from('vehicles')
            .orderBy('vehicles.name');
    };
    var create = function (params) {
        return knex
            .insert({
            name: params.name,
        })
            .into('vehicles')
            .then(function (res) {
            if (res.rowCount) {
                return true;
            }
            return false;
        });
    };
    var update = function (params) {
        return knex
            .update({
            name: params.name,
        })
            .from('vehicles')
            .where({
            id: params.id
        })
            .then(function (res) {
            if (res > 0)
                return true;
            return false;
        });
    };
    var drop = function (params) {
        return knex
            .delete()
            .from('vehicles')
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
        modelName: "vehicles",
        list,
        create,
        update,
        drop
    };
};
