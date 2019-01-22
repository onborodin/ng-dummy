exports.seed = function(knex, Promise) {
    return knex('relations').del()
        .then(function() {
            return knex('relations').insert([
                {"id":1,"driver_id":1,"vehicle_id":1,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":2,"driver_id":1,"vehicle_id":2,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":3,"driver_id":4,"vehicle_id":2,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":4,"driver_id":4,"vehicle_id":4,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":5,"driver_id":1,"vehicle_id":3,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":6,"driver_id":5,"vehicle_id":1,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":7,"driver_id":6,"vehicle_id":8,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},
                {"id":8,"driver_id":8,"vehicle_id":1,"created_at":"2019-01-08T23:09:18.530Z","updated_at":"2019-01-08T23:09:18.530Z"},

            ])
        })
}
