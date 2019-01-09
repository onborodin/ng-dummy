 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":1,"name":"qwerty","gecos":"Super Mario","password":"12345","superuser":true})
    rows.push({"id":2,"name":"nklokko","gecos":"Nikki Klocko","password":"12345","superuser":true})
    rows.push({"id":3,"name":"rosetta","gecos":"Rosetta Sipes","password":"12345","superuser":false})
    rows.push({"id":4,"name":"user2","gecos":"Lorem Captum","password":"12345","superuser":false})
    rows.push({"id":5,"name":"skyekr","gecos":"Skye Krajcik","password":"12345","superuser":false})
    rows.push({"id":6,"name":"kirluke","gecos":"Bennie Kerluke","password":"12345","superuser":false})
    rows.push({"id":7,"name":"koeplin","gecos":"Virginia Koelpin","password":"12345","superuser":false})
    rows.push({"id":8,"name":"mhowe","gecos":"Malachi Howe","password":"12345","superuser":false})


    console.log(rows.length)
    var chunkSize = 50
    return knex('users').del()
        .then(function() {
            return knex.batchInsert('users', rows, chunkSize)
        })
}

