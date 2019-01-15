'use strict'

const fs = require('fs')
const util = require('util')
const path = require('path')

const body = require('koa-body')
const json = require('koa-json')
const mount = require('koa-mount')
const responseTime = require('koa-response-time')
const send = require('koa-send')
const serve = require('koa-static')
const compress = require('koa-compress')
const helmet = require('koa-helmet')
const conditional = require('koa-conditional-get')
const etag = require('koa-etag')

const uuid = require('uuid/v4')
const lodash = require('lodash')

const Koa = require('koa')
const app = new Koa()


// *** command line option handler *** //

const minimist = require('minimist')
var argv = minimist(process.argv.slice(2))

if (argv.help) {
    console.log('Expresso sample web application')
    console.log('Usage: expresso [options]')
    console.log('    --daemon daemonize process')
    process.exit()
}

// *** configuration *** //

const customConfig = require('./config')
var config = {
    publicDir: __dirname + '/public',
    runDir: __dirname + '/run',
    logDir: __dirname + '/log',
    dataDir: __dirname + '/data',
    port: 3000,
    host: "0.0.0.0"
}

config = lodash.defaultsDeep(customConfig, config)

// *** access logger *** //

if (!module.parent) {
    const accessLogger = require('./logger')
    app.use(accessLogger(config))
}

// *** sessioning *** //

const session = require('./session')
app.use(session())

// *** pligins *** //

app.use(responseTime())
app.use(helmet())
app.use(json())
app.use(serve(config.publicDir))
app.use(body())
app.use(conditional())
app.use(etag())


// *** generic logger *** //

if (!module.parent) {
    function logger (...data) {
        var date = new Date().toISOString()

        const logPath = path.join(config.logDir, 'debug.log')
        const logStream = fs.createWriteStream(logPath, {flags : 'a'})
        const logStdout = process.stdout
        const record = `${date} ${util.format(data)}\n`

        logStream.write(record)
        logStdout.write(record)
    }
    console.log = logger
    console.error = logger
}

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

const login = require('./routers/login')
app.use(mount('/', login()))

const upload = require('./routers/upload')
app.use(mount('/upload', upload))

const root = require('./routers/root')
app.use(mount('/', root))


// *** daemonize *** //

const daemon = require('./daemon')
if (argv.daemon) {
    daemon()
}


// *** listener *** //

/*
if (!module.parent) { 
    app.listen({ port: config.port, host: config.host })
    console.log(`#server running on ${config.host}:${config.port}`)
}
*/

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
