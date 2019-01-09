
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.string('password')
            table.boolean('superuser')
            table.string('gecos')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('drivers', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('vehicles', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('connections', function(table) {
            table.increments('id').primary().unique()
            table.integer('driver_id')
            table.integer('vehicle_id')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
}

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('users')
        .dropTable('drivers')
        .dropTable('vehicles')
        .dropTable('connections')
}
