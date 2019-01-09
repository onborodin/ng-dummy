 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":1,"name":"Skye Krajcik"})
    rows.push({"id":2,"name":"Bennie Kerluke"})
    rows.push({"id":3,"name":"Virginia Koelpin"})
    rows.push({"id":4,"name":"Malachi Howe"})
    rows.push({"id":5,"name":"Friedrich Ankunding I"})
    rows.push({"id":6,"name":"Hellen Rowe"})
    rows.push({"id":7,"name":"Alexandre Erdman"})
    rows.push({"id":8,"name":"Ryleigh Osinski"})
    rows.push({"id":9,"name":"Savanna Goodwin"})
    rows.push({"id":10,"name":"Rosetta Sipes"})
    rows.push({"id":11,"name":"Michel Monahan"})
    rows.push({"id":12,"name":"Nikki Klocko"})
    rows.push({"id":13,"name":"Angus Ruecker"})
    rows.push({"id":14,"name":"Bennett Pacocha"})
    rows.push({"id":15,"name":"Winston Predovic"})
    rows.push({"id":16,"name":"Leonora Graham I"})
    rows.push({"id":17,"name":"Miss Jaleel Cormier"})
    rows.push({"id":18,"name":"Henderson Boehm"})
    rows.push({"id":19,"name":"Romaine Cronin"})
    rows.push({"id":20,"name":"Camila Murazik DVM"})


    console.log(rows.length)
    var chunkSize = 50
    return knex('drivers').del()
        .then(function() {
            return knex.batchInsert('drivers', rows, chunkSize)
        })
}

