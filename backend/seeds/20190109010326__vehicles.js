 
exports.seed = function(knex, Promise) {
    var rows = []

    rows.push({"id":1,"name":"FDF9BC"})
    rows.push({"id":2,"name":"D2F321"})
    rows.push({"id":3,"name":"7061B4"})
    rows.push({"id":4,"name":"50F485"})
    rows.push({"id":5,"name":"E83B8A"})
    rows.push({"id":6,"name":"F10AFD"})
    rows.push({"id":7,"name":"C6FDBF"})
    rows.push({"id":8,"name":"9A7A62"})
    rows.push({"id":9,"name":"C754F7"})
    rows.push({"id":10,"name":"4FADE5"})
    rows.push({"id":11,"name":"9F2BDD"})
    rows.push({"id":12,"name":"0CA677"})
    rows.push({"id":13,"name":"7D9A88"})
    rows.push({"id":14,"name":"649439"})
    rows.push({"id":15,"name":"0D3415"})
    rows.push({"id":16,"name":"026E8E"})
    rows.push({"id":17,"name":"81AD45"})
    rows.push({"id":18,"name":"FE33AB"})
    rows.push({"id":19,"name":"1E0BE5"})
    rows.push({"id":20,"name":"DB5B35"})
    rows.push({"id":21,"name":"CD4851"})
    rows.push({"id":22,"name":"86D0EE"})
    rows.push({"id":23,"name":"695BF9"})
    rows.push({"id":24,"name":"643FA5"})
    rows.push({"id":25,"name":"7DA48F"})
    rows.push({"id":26,"name":"B1F6C9"})
    rows.push({"id":27,"name":"498827"})
    rows.push({"id":28,"name":"D51DDA"})
    rows.push({"id":29,"name":"8AD9FA"})
    rows.push({"id":30,"name":"5722B1"})
    rows.push({"id":31,"name":"7F09BD"})
    rows.push({"id":32,"name":"3D5BDC"})
    rows.push({"id":33,"name":"142A7E"})
    rows.push({"id":34,"name":"ADF0A0"})
    rows.push({"id":35,"name":"2E30C2"})
    rows.push({"id":36,"name":"03530D"})
    rows.push({"id":37,"name":"922D28"})
    rows.push({"id":38,"name":"23C3BD"})
    rows.push({"id":39,"name":"CC8817"})
    rows.push({"id":40,"name":"CF213A"})


    console.log(rows.length)
    var chunkSize = 50
    return knex('vehicles').del()
        .then(function() {
            return knex.batchInsert('vehicles', rows, chunkSize)
        })
}

