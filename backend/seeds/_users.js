exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function() {
            return knex('users').insert([
                {"id":5,"name":"qwerty","password":"12345","gecos":null,"created_at":"2018-11-25T08:36:32.344Z","updated_at":"2018-11-25T08:36:32.344Z"},
                {"id":6,"name":"user","password":"12345","gecos":null,"created_at":"2018-11-25T08:36:54.598Z","updated_at":"2018-11-25T08:36:54.598Z"},

            ])
        })
}
