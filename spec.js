var request = require('supertest')

describe('loading server', function() {

    var server

    beforeEach(function() {
        server = require('./server').listen()
    })

    afterEach(function() {
        server.close()
    })

    it('responds to /', function testSlash(done) {
        request(server)
            .get('/')
            .expect(200, done)

    })

})
