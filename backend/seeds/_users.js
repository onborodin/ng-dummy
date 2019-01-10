exports.seed = function(knex, Promise) {
    return knex('users').del()
        .then(function() {
            return knex('users').insert([
                {"id":1,"name":"qwerty","password":"12345","superuser":true,"gecos":"Super Mario","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":2,"name":"nklokko","password":"12345","superuser":true,"gecos":"Nikki Klocko","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":3,"name":"rosetta","password":"12345","superuser":false,"gecos":"Rosetta Sipes","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":4,"name":"user2","password":"12345","superuser":false,"gecos":"Lorem Captum","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":5,"name":"skyekr","password":"12345","superuser":false,"gecos":"Skye Krajcik","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":6,"name":"kirluke","password":"12345","superuser":false,"gecos":"Bennie Kerluke","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":7,"name":"koeplin","password":"12345","superuser":false,"gecos":"Virginia Koelpin","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":8,"name":"mhowe","password":"12345","superuser":false,"gecos":"Malachi Howe","created_at":"2019-01-08T23:09:18.551Z","updated_at":"2019-01-08T23:09:18.551Z"},
                {"id":12,"name":"qwerty1","password":"12345","superuser":null,"gecos":"xxxxxxx","created_at":"2019-01-08T23:22:49.720Z","updated_at":"2019-01-08T23:22:49.720Z"},

            ])
        })
}
