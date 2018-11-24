var jayson = require('jayson');

var client = jayson.client.http('http://localhost:3100/api');

client.request('get', {id: 9}, function(err, response) {
    if (err) throw err;
    console.log({ userFindId: response });
});

client.request('list', {}, function(err, response) {
    if (err) throw err;
    console.log({ userFindAll: response });
});


