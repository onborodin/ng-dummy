exports.seed = function(knex, Promise) {
    return knex('data').del()
        .then(function() {
            return knex('data').insert([
            ])
        })
}
