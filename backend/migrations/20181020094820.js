
exports.up = function(knex, Promise) {
    return knex.schema
        .createTable('users', function(table) {
            table.increments('id').primary().unique()
            table.string('name')
            table.string('password')
            table.string('gecos')
            table.timestamp('created_at').defaultTo(knex.fn.now())
            table.timestamp('updated_at').defaultTo(knex.fn.now())
        })
}

exports.down = function(knex, Promise) {
    return knex.schema
        .dropTable('domains')
        .dropTable('roles')
        .dropTable('users')
}
