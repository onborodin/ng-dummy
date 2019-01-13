'use strict'

const fs = require('fs')
const util = require('util')
const path = require('path')

const body = require('koa-body')
const json = require('koa-json')
const mount = require('koa-mount')
const responseTime = require('koa-response-time')
const send = require('koa-send')
const session = require('koa-session')
const serve = require('koa-static')
const compress = require('koa-compress')
const helmet = require('koa-helmet')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')

const config = require('./config')

const Koa = require('koa')
const app = new Koa()

app.use(helmet())
app.use(body())
app.use(responseTime())
app.use(json())
app.use(serve(config.publicDir))
app.use(conditional())
app.use(etag())

// *** sessioning *** //

const sessionStore = require('koa-sqlite3-session')
const sessionConfig = {
    key: 'session',
    maxAge: 60 * 1000,
    autoCommit: true,
    overwrite: true,
    httpOnly: false,
    signed: true,
    rolling: true,
    renew: false,
    //store: new sessionStore(__dirname + '/session.db')
}

app.keys = ['secret']
app.use(session(sessionConfig, app))
app.use(async function (ctx, next) {
    //ctx.session.count = ctx.session.count || 0
    //ctx.session.count += 1
    await next()
})


// *** generic logger *** //
if (!module.parent) { 
    async function logger (...data) {
        var date = new Date().toISOString()

        const logPath = path.join(config.logDir, 'debug.log')
        const logStream = fs.createWriteStream(logPath, {flags : 'a'})
        const logStdout = process.stdout
        logStream.write(`${date} ${util.format(data)}\n`)
        logStdout.write(`${date} ${util.format(data)}\n`)
    }
console.log = logger
console.error = logger
}
// *** access logger *** //

app.use(async function (ctx, next) {
    let start = process.hrtime()
    const stamp = new Date().toISOString()

    return next().then(function() {
        let delta = process.hrtime(start)
        delta = delta[0] * 1000 + delta[1] / 1000000
        delta = Math.round(delta)
        const req = ctx.request
        const res = ctx.response
        const record = `${stamp} ${req.ip} ${req.method}` + 
            ` ${req.protocol}://${req.header.host} ${req.url}` + 
            ` ${req.type} ${delta}ms ${res.status} ${res.message}`
        const logPath = path.join(config.logDir, 'access.log')
        const logStream = fs.createWriteStream(logPath, {flags : 'a'})
        logStream.write(record)
        console.log(record)
    })
})

// *** error reporter *** //

const error = require('koa-json-error')
function formatError(err) {
    return {
        error: {
            status: err.status || 'Internal Server Error',
            name: err.name,
            message: err.message,
        }
    }
}

app.use(error(formatError))

// *** compressor *** //

app.use(compress({
    filter: function (content_type) {
        return /text/i.test(content_type)
    },
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH
}))

// *** uploader *** //

const upload = require('./routers/upload')
app.use(mount('/upload', upload))

const root = require('./routers/root')
app.use(mount('/', root))

// *** listener *** //

if (!module.parent) { 
    const cluster = require('cluster')
    if (cluster.isMaster) {
        var cpuCount = require('os').cpus().length
        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork()
        }
        const pidFile = path.join(config.runDir, 'lorem.pid')
        const fd = fs.openSync(pidFile, 'w')
        fs.writeSync(fd, process.pid)
        fs.closeSync(fd)
    } else {
        app.listen({ port: config.port, host: config.host })
        console.log(`#server running on ${config.host}:${config.port}`)
    }
}

if (module.parent) { 
    module.exports = app
}
// *** eof *** //
