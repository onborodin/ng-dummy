'use strict'

module.exports = function(knex) {

    var find = function(params) {
        return knex
            .select([
                'customers.*',
            ])
            .from('customers')
            .where(
                'customers.phone1', '~', params.phone1
            )
            .orWhere(
                'customers.phone2', '~', params.phone2
            )
            .orWhere(
                'customers.name', '~', params.name
            )
            .limit(50)

    }

    var get = function(params) {
        return knex
            .select([
                'customers.*',
            ])
            .from('customers')
            .where({
                'customers.id': params.id,
            })
    }

    var create = function(params) {
        return knex
            .insert({
                name: params.name,
                phone1: params.phone1,
                phone2: params.phone2,
                city: params.city,
                agreement: params.agreement,
            })
            .into('customers')
    }


    return {
        modelName: "customers",
        find: find,
        get: get,
        create: create
    }
}
