'use strict'

const debug = require('debug')

const fs = require('fs')
const util = require('util')
const path = require('path')
const os = require('os')

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

const customConfig = require('lorem.json')
var config = {
    port: 3102,
    host: "0.0.0.0"
}

config = lodash.defaultsDeep(customConfig, config)

// *** prepare filesystem *** //

const tools = require('./tools')
const dirs = [ config.runDir, config.logDir, config.dataDir ]
dirs.forEach(function(dir) {
    tools.mkdir(dir)
})

// *** process handle maker ** //

const pidFile = path.join(config.runDir, 'pid')
const daemon = require('./daemon')(pidFile)
daemon.signalHandler()

// *** access logger *** //

if (!module.parent) {
    const accessLogger = require('./logger')
    app.use(accessLogger(config))
}

// *** sessioning *** //

const session = require('./session')
app.use(session({ runDir: config.runDir }))

// *** pligins *** //

app.use(responseTime())
app.use(helmet())
app.use(json())
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
        var buffer = ''
        data.forEach((item) => { 
            buffer += util.format(item) + ' '
        })
        const record = `${date} ${buffer}\n`

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
        return /(json|text|javascript|xml)/i.test(content_type)
    },
    threshold: 1024,
    flush: require('zlib').Z_SYNC_FLUSH
}))

// *** database adapter *** //

const knexfile = require('./knexfile')
if (debug.enabled('knex')) {
    knexfile.debug = true
}
const knexStringcase = require('knex-stringcase')(knexfile)
const knex = require('knex')(knexStringcase)

// *** router *** //

app.use(serve(config.publicDir))

const login = require('./routers/login')
app.use(mount('/api/login', login(knex)))

const users = require('./routers/users')
app.use(mount('/api/users', users(knex)))

const drivers = require('./routers/drivers')
app.use(mount('/api/drivers', drivers(knex)))

const vehicles = require('./routers/vehicles')
app.use(mount('/api/vehicles', vehicles(knex)))

const data = require('./routers/data')
app.use(mount('/data', data(knex, config)))


// **** basic routers *** //
const Router = require('koa-router')
const router = new Router()
async function index(ctx) {
    ctx.type = 'text/html'
    const filePath = path.join(config.publicDir, 'index.html')
    ctx.response.body = fs.createReadStream(filePath)
}

router.all('/', index)
router.all('/*', index)
app.use(router.routes())
app.use(router.allowedMethods())


//const login = require('./routers/login')
//app.use(mount('/', login()))

//const upload = require('./routers/upload')
//app.use(mount('/upload', upload))

//const root = require('./routers/root')
//app.use(mount('/', root))

// *** daemonize *** //

if (argv.daemon && !module.parent) {
    daemon.detach()
}

// *** listener *** //

app.listen({ port: config.port, host: config.host })
console.log(`#server running on ${config.host}:${config.port}`)

/*
const cluster = require('cluster')

if (!module.parent) { 
    if (cluster.isMaster) {
        var cpuCount = os.cpus().length
        for (var i = 0; i < cpuCount; i += 1) {
            cluster.fork()
        }
        daemon.writePid()
    } else {
        app.listen({ port: config.port, host: config.host })
        console.log(`#server running on ${config.host}:${config.port}`)
    }
}
*/

if (module.parent) { 
    module.exports = app
}
// *** eof *** //
