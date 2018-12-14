 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":0,"name":"Borodin Oleg","phone1":"79520587264","phone2":"79520587232","city":"Kenigsberg","agreement":"SPN1645","created_at":"2018-12-13T23:36:20.925Z","updated_at":"2018-12-13T23:36:20.925Z"})


    console.log(rows.length)
    var chunkSize = 50
    return knex('customers').del()
        .then(function() {
            return knex.batchInsert('customers', rows, chunkSize)
        })
}

