var request = require('supertest')

describe('loading server', function() {

    var server

    beforeEach(function() {
        server = require('./server').listen()
    })

    afterEach(function() {
        server.close()
    })

    it('responds to /', function(done) {
        request(server)
            .get('/')
            .expect(200, done)

    })

    it('responds to /blabla', function(done) {
        request(server)
            .get('/blabla')
            .expect(200, done)
    })

})
