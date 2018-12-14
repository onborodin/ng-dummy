
'use strict'

const exconfig = require('exconfig')

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
var exlog = require('exlog')(exconfig.logDir)
console.log = exlog
console.error = exlog

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
const excors = require('excors')

const app = express()

var formatStr = ':date[iso] :remote-addr :method :url :status :res[content-length] :res[content-type] :response-time ms'
var accessLog = fs.createWriteStream(exconfig.logDir + '/access.log', { flags: 'a' })
app.use(morgan(formatStr, { stream: accessLog }))
app.use(morgan(formatStr))

app.use(excors())
app.use(compression())
app.use(lowercasePaths())
app.use(helmet())
app.use(express.static(exconfig.publicDir))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(responseTime())

// *** create session *** 
const session = require('express-session')

const FileStore = require('session-file-store')(session)
app.use(session({
    store: new FileStore({ path: exconfig.runDir }),
    name: 'session',
    secret: 'efwe987ysdf9fsd69f9ds',
    resave: false,
    rolling: true,
    saveUninitialized: true,
    cookie: { 
            secure: false,
            maxAge: 3600 * 60 * 1000,
            httpOnly: false
    }
}))

// *** create knex shared object ***
const knexfile = require('knexfile')
const knex = require('knex')(knexfile.development)

// *** set routes ***

var login = require('./routers/login')(knex)
app.use('/api/login', login)

app.use(function(req, res, next) {
    if (typeof(req.session.userId) != 'undefined') {
        req.session.touch()
        next()
    } else {
         res.sendFile(path.join(exconfig.appDir, '/public/index.html'))
    }
})

var users = require('./routers/users')(knex)
app.use('/api/users', users)

var customers = require('./routers/customers')(knex)
app.use('/api/customers', customers)

app.get('/*', function(req, res) {
     res.sendFile(path.join(exconfig.appDir, '/public/index.html'))
})

// *** daemonize process *** 
const exdaemon = require('exdaemon')
if(argv.daemon) {
    exdaemon()
}

// *** write pid file *** 
const expid = require('expid')
expid.create(exconfig.pidFile)

// *** signal ans exeption handling ***
const exsig = require('exsig')
exsig(exconfig.pidFile)

// *** listen socket ***
const cluster = require('cluster')
if (cluster.isMaster) {
    var cpuCount = require('os').cpus().length + 1
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }
} else {
    app.listen(exconfig.port, exconfig.address, null, function() {
        try {
            process.setgid(exconfig.runGroup)
            process.setuid(exconfig.runUser)
        } catch (err) {
        console.log('Cannot change process user and group')
            process.exit(1)
        }
    })
}

