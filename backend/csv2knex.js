#!/usr/bin/env node

'use strict'

const fs = require('fs')
const readline = require('readline')

const knexfile = require('./knexfile')
const knex = require('knex')(
    knexfile.development
)

const customers = require('./models/customers')(knex)

var rd = readline.createInterface({
    input: fs.createReadStream('customers.csv'),
    console: false
})

function phoneNormalize(phone) {
    //if (phone.length === 10) {
    //    phone = '7' + phone
    //}
    phone = phone.replace(/[\-.()]/g, '')
    phone = phone.split(' ')[0]
    return phone
}

var rows = []

//City,Full Name,Phone2,Phone1,Id
// 0          1      2       3     4
rd.on('line', (line) => {
    var arr = line.split(',')
    var customer = {
        agreement: arr[4].trim(),
        name: arr[1].trim(),
        phone1: arr[2].trim(),//.replace(/[()\-.+]/g, ''),
        phone2: arr[3].trim(),//.replace(/[()\-.+]/g, ''),
        city: arr[0].trim() + '',
        //email: arr[6].trim() + ''
    }

    customer.phone1 = phoneNormalize(customer.phone1)
    customer.phone2 = phoneNormalize(customer.phone2)
    //console.log(customer)

    rows.push(customer)
})



rd.on('close', () => {
    console.log({
        len: rows.length
    })

    var chunkSize = 50
    knex.batchInsert('customers', rows, chunkSize)
        .returning('id')
        .then(function(ids) {
        })
        .catch(function(err) {
            console.log(err)
        })
        .finally(function() {
            knex.destroy();
        })
})
