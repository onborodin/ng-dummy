 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":5,"name":"qwerty","password":"12345","superuser":true,"gecos":"Zurb Gnorb","created_at":"2018-11-25T08:36:32.344Z","updated_at":"2018-11-25T08:36:32.344Z"})
    rows.push({"id":2,"name":"kokkolo","password":"12345","superuser":false,"gecos":"Kokkolo Lokkalo","created_at":"2018-12-14T01:36:38.706Z","updated_at":"2018-12-14T01:36:38.706Z"})


    console.log(rows.length)
    var chunkSize = 50
    return knex('users').del()
        .then(function() {
            return knex.batchInsert('users', rows, chunkSize)
        })
}

