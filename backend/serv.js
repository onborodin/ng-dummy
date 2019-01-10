'use strict'

const config = require('lorem.conf')

const path = require('path')
const fs = require('fs')
const util = require('util')
const lodash = require('lodash')

const minimist = require('minimist')
var argv = minimist(process.argv.slice(2))

if (argv.help) {
    console.log('Expresso sample web application')
    console.log('Usage: expresso [options]')
    console.log('    --daemon daemonize process')
    process.exit()
}

//*** make log ***=
var logger = require('utils/logger')(config.logDir)
console.log = logger
console.error = logger

// *** throw ***
//throw new Error('Boum!')

// *** attach express plugins ***
const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compression = require('compression')
const responseTime = require('response-time')
const morgan = require('morgan')
const lowercasePaths = require('express-lowercase-paths')
const cors = require('plugins/cors')
const busboy = require('connect-busboy')
//const busboy = require('express-busboy')

const app = express()

var formatStr = ':date[iso] :remote-addr :method :url :status :res[content-length] :res[content-type] :response-time ms'
var accessLog = fs.createWriteStream(config.logDir + '/access.log', {
    flags: 'a'
})
app.use(morgan(formatStr, {
    stream: accessLog
}))
app.use(morgan(formatStr))

app.use(cors())
app.use(compression())
app.use(lowercasePaths())
app.use(helmet())
app.use(express.static(config.publicDir))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(busboy({
    highWaterMark: 1 * 1024 * 1024, 
    limits: {
        fileSize: 16 * 1024 * 1024,
        fieldSize: 16 * 1024 * 1024
    }
}))
app.use(responseTime())


// *** create session *** 
const session = require('express-session')

const FileStore = require('session-file-store')(session)
app.use(session({
    store: new FileStore({
        path: config.runDir
    }),
    name: 'session',
    secret: 'efwe987ysdf9fsd69f9ds',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 20 * 60 * 1000,
        httpOnly: false
    }
}))

// *** create knex shared object ***
const knexfile = require('knexfile')
const knexStringcase = require('knex-stringcase')(knexfile)
const knex = require('knex')(knexStringcase)

// *** set routes ***

var login = require('./routers/login')(knex)
app.use('/api/login', login)

//app.use(function(req, res, next) {
//    if (typeof(req.session.userId) != 'undefined') {
//        req.session.touch()
//        next()
//    } else {
//         res.sendFile(path.join(config.appDir, '/public/index.html'))
//    }
//})

const users = require('./routers/users')(knex)
app.use('/api/users', users)

const drivers = require('./routers/drivers')(knex)
app.use('/api/drivers', drivers)

const vehicles = require('./routers/vehicles')(knex)
app.use('/api/vehicles', vehicles)

const upload = require('./routers/data')(knex)
app.use('/data', upload)

app.get('/*', function(req, res) {
    res.sendFile(path.join(config.appDir, '/public/index.html'))
})

app.all('/*', function(req, res) {
    //res.sendFile(path.join(config.appDir, '/public/index.html'))
    res.json({  result: true, end: true });
})


// *** daemonize process *** 
const daemon = require('utils/daemon')
if (argv.daemon) {
    daemon()
}


// *** signal ans exeption handling ***
const sig = require('utils/signal')
sig(config.pidFile)

// *** listen socket ***
const cluster = require('cluster')
if (cluster.isMaster) {

    // *** write pid file *** 
    const pid = require('utils/pid')
    pid.create(config.pidFile)

    var cpuCount = require('os').cpus().length + 1
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    app.listen(config.port, config.address, null, function() {
        try {
            process.setgid(config.runGroup)
            process.setuid(config.runUser)
        } catch (err) {
            console.log('Cannot change process user and group')
            process.exit(1)
        }
    })
}