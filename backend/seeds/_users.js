exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function() {
            return knex('users').insert([
                {"id":1,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":2,"name":"user2","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":3,"name":"user3","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":4,"name":"user4","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":5,"name":"user5","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":6,"name":"user6","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":7,"name":"user7","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":8,"name":"user8","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":11,"name":"user8","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":12,"name":"user9","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":13,"name":"user11","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":14,"name":"user77","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":15,"name":"user56","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":16,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":17,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":18,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":19,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":22,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":21,"name":"user","password":"12345","gecos":null,"created_at":"2018-10-24T17:46:09.000Z","updated_at":"2018-10-24T17:46:09.000Z"},
                {"id":9,"name":"qwerty","password":"12345","gecos":null,"created_at":"2018-10-24T18:14:20.000Z","updated_at":"2018-10-24T18:14:20.000Z"},
                {"id":10,"name":"zairtant","password":"12345","gecos":null,"created_at":"2018-10-24T18:15:07.000Z","updated_at":"2018-10-24T18:15:07.000Z"},
            ])
        })
}
