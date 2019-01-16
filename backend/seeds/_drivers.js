exports.seed = function(knex, Promise) {
    return knex('drivers').del()
        .then(function() {
            return knex('drivers').insert([
                {"id":1,"name":"Skye Krajcik","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":2,"name":"Bennie Kerluke","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":3,"name":"Virginia Koelpin","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":4,"name":"Malachi Howe","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":5,"name":"Friedrich Ankunding I","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":6,"name":"Hellen Rowe","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":7,"name":"Alexandre Erdman","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":8,"name":"Ryleigh Osinski","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":9,"name":"Savanna Goodwin","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":10,"name":"Rosetta Sipes","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":11,"name":"Michel Monahan","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":12,"name":"Nikki Klocko","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":13,"name":"Angus Ruecker","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":14,"name":"Bennett Pacocha","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":15,"name":"Winston Predovic","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":16,"name":"Leonora Graham I","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":17,"name":"Miss Jaleel Cormier","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":18,"name":"Henderson Boehm","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":19,"name":"Romaine Cronin","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},
                {"id":20,"name":"Camila Murazik","created_at":"2019-01-08T23:09:18.544Z","updated_at":"2019-01-08T23:09:18.544Z"},

            ])
        })
}
