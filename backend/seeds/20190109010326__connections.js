 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":1,"driver_id":1,"vehicle_id":1})
    rows.push({"id":2,"driver_id":1,"vehicle_id":2})
    rows.push({"id":3,"driver_id":4,"vehicle_id":2})
    rows.push({"id":4,"driver_id":4,"vehicle_id":4})
    rows.push({"id":5,"driver_id":1,"vehicle_id":3})
    rows.push({"id":6,"driver_id":5,"vehicle_id":1})
    rows.push({"id":7,"driver_id":6,"vehicle_id":8})
    rows.push({"id":8,"driver_id":8,"vehicle_id":1})


    console.log(rows.length)
    var chunkSize = 50
    return knex('connections').del()
        .then(function() {
            return knex.batchInsert('connections', rows, chunkSize)
        })
}

