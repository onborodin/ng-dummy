
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('customers', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.string('phone1')
            table.string('phone2')
            table.string('city')
            table.string('agreement')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
        .createTable('users', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.string('password')
            table.boolean('superuser')
            table.string('gecos')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
}

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('users')
        .dropTable('customers')
}
