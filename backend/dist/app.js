/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./exserv.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./exconfig.js":
/*!*********************!*\
  !*** ./exconfig.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nmodule.exports = {\n    nodeBin: '/usr/local/bin/node',\n    appDir: '/home/ziggi/expresso/backend',\n    publicDir: '/home/ziggi/expresso/backend/public',\n    uploadDir: '/home/ziggi/expresso/backend/uploads',\n    port: 3100,\n    address: '127.0.0.1',\n    runUser: 'ziggi',\n    runGroup: 'wheel',\n    logDir: '/home/ziggi/expresso/backend/logs',\n    pidFile: '/home/ziggi/expresso/backend/run/pid',\n    runDir: '/home/ziggi/expresso/backend/run'\n}\n\n\n//# sourceURL=webpack:///./exconfig.js?");

/***/ }),

/***/ "./excors.js":
/*!*******************!*\
  !*** ./excors.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nmodule.exports = function nocors() {\n    return function _nocors(req, res, next) {\n        res.header('Access-Control-Allow-Origin', '*')\n        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')\n        next()\n    }\n}\n\n\n//# sourceURL=webpack:///./excors.js?");

/***/ }),

/***/ "./exdaemon.js":
/*!*********************!*\
  !*** ./exdaemon.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\n\nconst child_process = __webpack_require__(/*! child_process */ \"child_process\")\n\nfunction child(exe, args, env) {\n    const child = child_process.spawn(exe, args, { \n            detached: true,\n            stdio: ['ignore', 'ignore', 'ignore'],\n            env: env\n    })\n    child.unref()\n    return child\n}\n\nmodule.exports = function(nodeBin) {\n    console.log('Daemonize process')\n\n    if (process.env.__daemon) {\n        return process.pid\n    }\n    process.env.__daemon = true\n\n    var args = [].concat(process.argv)\n    var node = args.shift()\n    var env = process.env\n    child(node, args, env)\n    return process.exit()\n}\n\n\n//# sourceURL=webpack:///./exdaemon.js?");

/***/ }),

/***/ "./exdir.js":
/*!******************!*\
  !*** ./exdir.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar fs = __webpack_require__(/*! fs */ \"fs\")\n\nmodule.exports = {\n    writable: function(dir) {\n        var dummyFile = dir + '/.dummy'\n        if (fs.existsSync(dir)) {\n            try {\n                var fd = fs.openSync(dummyFile, 'w')\n                fs.writeSync(fd, process.pid)\n                fs.closeSync(fd)\n                fs.unlinkSync(dummyFile)\n                return true\n            } catch (err) {\n                return false\n            }\n        } \n        if (!fs.existsSync(dir)) {\n            try { \n                fs.mkdirSync(dir)\n                return true\n            } catch {\n                return false\n            }\n        }\n    }\n}\n\n\n\n//# sourceURL=webpack:///./exdir.js?");

/***/ }),

/***/ "./exlog.js":
/*!******************!*\
  !*** ./exlog.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst util = __webpack_require__(/*! util */ \"util\")\nconst exdir = __webpack_require__(/*! exdir */ \"./exdir.js\")\n\nmodule.exports = function(logDir) {\n    if (!exdir.writable(logDir)) {\n        console.log('Cannot write to log directory ' + logDir + '. Exit process.')\n        process.exit(1)\n    }\n    var consoleLog = function(data) {\n        var date = new Date().toISOString()\n        const logFile = fs.createWriteStream(logDir + '/debug.log', {flags : 'a'})\n        const logStdout = process.stdout\n        logFile.write(date + ' ' + util.format(data) + '\\n')\n        logStdout.write(date + ' ' + util.format(data) + '\\n')\n    }\n    return consoleLog\n}\n\n\n//# sourceURL=webpack:///./exlog.js?");

/***/ }),

/***/ "./expid.js":
/*!******************!*\
  !*** ./expid.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\nvar fs = __webpack_require__(/*! fs */ \"fs\")\nvar path = __webpack_require__(/*! path */ \"path\")\nvar exdir = __webpack_require__(/*! exdir */ \"./exdir.js\")\n\nvar _write = function(path) {\n        try {\n            var fd = fs.openSync(path, 'w')\n        } catch (err) {\n            return false;\n        }\n        fs.writeSync(fd, process.pid)\n        fs.closeSync(fd)\n        return true\n}\n\nvar drop = function(path) {\n        try {\n            fs.unlinkSync(path);\n            return true;\n        } catch (err) {\n            return false;\n        }\n}\n\nvar create = function(pidFile) {\n    var pidDir = path.basename(path.dirname(pidFile))\n\n    if (!exdir.writable(pidDir)) {\n        console.log('Cannot write to  directory ' + pidDir + '. Exit process.')\n        process.exit(1)\n    }\n\n    if (!_write(pidFile)) {\n        console.log('Cannot write pid file ' + pidFile)\n        process.exit(1)\n    }\n}\n\nmodule.exports = {\n    create: create,\n    drop: drop\n}\n\n\n\n//# sourceURL=webpack:///./expid.js?");

/***/ }),

/***/ "./exserv.js":
/*!*******************!*\
  !*** ./exserv.js ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\nconst config = __webpack_require__(/*! exconfig */ \"./exconfig.js\")\n\nconst path = __webpack_require__(/*! path */ \"path\")\nconst fs = __webpack_require__(/*! fs */ \"fs\")\nconst util = __webpack_require__(/*! util */ \"util\")\nconst lodash = __webpack_require__(/*! lodash */ \"lodash\")\n\nconst minimist = __webpack_require__(/*! minimist */ \"minimist\")\nvar argv = minimist(process.argv.slice(2))\n\nif (argv.help) {\n    console.log('Expresso sample web application')\n    console.log('Usage: expresso [options]')\n    console.log('    --daemon daemonize process')\n    process.exit()\n}\n\n//*** make log ***=\nvar exlog = __webpack_require__(/*! exlog */ \"./exlog.js\")(config.logDir)\nconsole.log = exlog\nconsole.error = exlog\n\n// *** throw ***\n//throw new Error('Boum!')\n\n// *** serve ***\nconst express = __webpack_require__(/*! express */ \"express\")\nconst helmet = __webpack_require__(/*! helmet */ \"helmet\")\nconst session = __webpack_require__(/*! express-session */ \"express-session\")\nconst cookieParser = __webpack_require__(/*! cookie-parser */ \"cookie-parser\")\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\")\nconst compression = __webpack_require__(/*! compression */ \"compression\")\nconst responseTime = __webpack_require__(/*! response-time */ \"response-time\")\nconst morgan = __webpack_require__(/*! morgan */ \"morgan\")\nconst lowercasePaths = __webpack_require__(/*! express-lowercase-paths */ \"express-lowercase-paths\")\nconst excors = __webpack_require__(/*! excors */ \"./excors.js\")\n\nconst app = express()\n\nvar formatStr = ':date[iso] :remote-addr :method :url :status :res[content-length] :res[content-type] :response-time ms'\nvar accessLog = fs.createWriteStream(config.logDir + '/access.log', { flags: 'a' })\napp.use(morgan(formatStr, { stream: accessLog }))\napp.use(morgan(formatStr))\n\napp.use(excors())\napp.use(compression())\napp.use(lowercasePaths())\napp.use(helmet())\napp.use(express.static(config.publicDir))\napp.use(cookieParser())\napp.use(bodyParser.json())\napp.use(responseTime())\n\napp.get('/', function(req, res) {\n     res.sendFile(path.join(exconfig.appDir, '/public/index.html'))\n})\n\n// *** json rpc *** \nconst knexfile = __webpack_require__(/*! knexfile */ \"./knexfile.js\")\nconst knex = __webpack_require__(/*! knex */ \"knex\")(knexfile.development)\n\nconst usersModel = __webpack_require__(/*! ./models/users */ \"./models/users.js\")(knex)\nconst methods = Object.assign({}, usersModel)\n\nconst jayson = __webpack_require__(/*! jayson */ \"jayson\")\nconst jserver = jayson.server(methods, {\n    router: function(method, args) {\n        if (typeof(this._methods[method]) === 'object') \n            return this._methods[method]\n        else\n            return undefined\n    }\n})\n\n// *** route ***\napp.post('/api', jserver.middleware())\napp.get('/*', function(req, res) {\n     res.sendFile(path.join(exconfig.appDir, '/public/index.html'))\n})\n\n// *** daemonize process *** \nconst exdaemon = __webpack_require__(/*! exdaemon */ \"./exdaemon.js\")\nif(argv.daemon) {\n    exdaemon()\n}\n\n// *** write pid file *** \nconst expid = __webpack_require__(/*! expid */ \"./expid.js\")\nexpid.create(config.pidFile)\n\n// *** signal ans exeption handling ***\nconst exsig = __webpack_require__(/*! exsig */ \"./exsig.js\")\nexsig(config.pidFile)\n\n// *** listen socket ***\nconst cluster = __webpack_require__(/*! cluster */ \"cluster\")\nif (cluster.isMaster) {\n    var cpuCount = __webpack_require__(/*! os */ \"os\").cpus().length + 3\n    for (var i = 0; i < cpuCount; i += 1) {\n        cluster.fork();\n    }\n} else {\n    app.listen(config.port, config.address, null, function() {\n        try {\n            process.setgid(config.runGroup)\n            process.setuid(config.runUser)\n        } catch (err) {\n        console.log('Cannot change process user and group')\n            process.exit(1)\n        }\n    })\n}\n\n\n//# sourceURL=webpack:///./exserv.js?");

/***/ }),

/***/ "./exsig.js":
/*!******************!*\
  !*** ./exsig.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nconst expid = __webpack_require__(/*! expid */ \"./expid.js\")\n\nmodule.exports = function(pidFile) {\n\n    function _exit() {\n        expid.drop(pidFile)\n        setTimeout(function() { \n            process.exit(0)\n        }, 100)\n    }\n\n    process.on('SIGINT', _exit)\n    process.on('SIGTERM', _exit)\n\n    process.on('uncaughtException', function (err) {\n        if (err) {\n            console.log(\"caughtException but no error msg\" + err.stack)\n            setTimeout(function() { \n                process.exit(1)\n            }, 500)\n        }\n    })\n}\n\n\n//# sourceURL=webpack:///./exsig.js?");

/***/ }),

/***/ "./knexfile.js":
/*!*********************!*\
  !*** ./knexfile.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("\nvar path = __webpack_require__(/*! path */ \"path\")\nvar dbFile = path.join(__dirname, 'devel.db')\n\nmodule.exports = {\n    development: {\n        client: 'sqlite3',\n        //debug: true,\n        client: 'sqlite3',\n        connection: {\n            filename: dbFile\n        },\n        useNullAsDefault: true,\n        migrations: {\n            //tableName: 'knex_migrations'\n            directory: __dirname + '/migrations'\n        },\n        seeds: {\n            directory: __dirname + '/seeds'\n        }\n    },\n    staging: {\n        client: 'sqlite3',\n        connection: {\n            filename: dbFile\n        },\n        useNullAsDefault: true,\n        migrations: {\n            tableName: 'knex_migrations'\n        }\n    },\n    production: {\n        client: 'sqlite3',\n        connection: {\n            filename: dbFile\n        },\n        useNullAsDefault: true,\n        migrations: {\n            tableName: 'knex_migrations'\n        }\n    }\n}\n\n\n//# sourceURL=webpack:///./knexfile.js?");

/***/ }),

/***/ "./models/users.js":
/*!*************************!*\
  !*** ./models/users.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n\nmodule.exports = function(knex) {\n\n    var login = function(params, callback) {\n        return knex\n            .select([\n                'users.*',\n                'domains.name as domain_name',\n                'roles.description as role_description',\n                'roles.name as role_name',\n            ])\n            .from('users')\n            .leftJoin('domains as domains', 'domains.id', 'users.domain_id')\n            .leftJoin('roles as roles', 'roles.id', 'users.role_id')\n            .where({\n                'users.name': params.userName,\n                'users.password': params.password,\n                'domains.name': params.domainName\n            })\n            .then(function(res) {\n                callback(null, res)\n            })\n    }\n\n    var findAll = function(params, callback) {\n        return knex\n            .select([\n                'users.*',\n                'domains.name as domain_name',\n                'roles.description as role_description',\n                'roles.name as role_name',\n            ])\n            .from('users')\n            .leftJoin('domains as domains', 'domains.id', 'users.domain_id')\n            .leftJoin('roles as roles', 'roles.id', 'users.role_id')\n            .orderBy('users.name')\n            .then(function(res) {\n                callback(null, res)\n            })\n    }\n\n\n    var findId = function(params, callback) {\n        return knex\n            .select([\n                'users.*',\n                'domains.name as domain_name',\n                'roles.description as role_description',\n                'roles.name as role_name',\n            ])\n            .from('users')\n            .leftJoin('domains as domains', 'domains.id', 'users.domain_id')\n            .leftJoin('roles as roles', 'roles.id', 'users.role_id')\n            .where({\n                'users.id': params.id,\n            })\n            .orderBy('users.name')\n            .then(function(res) {\n                callback(null, res)\n            })\n    }\n\n    var create = function(params, callback) {\n        return knex\n            .insert({\n                gecos: params.gecos,\n                name: params.name,\n                password: params.password,\n                domain_id: params.domain_id,\n                role_id: params.role_id\n            })\n            .into('users')\n            .then(function(res) {\n                callback(null, res)\n            })\n    }\n\n    var update = function(params, callback) {\n        return knex\n            .update({\n                gecos: params.gecos,\n                name: params.name,\n                password: params.password,\n                domain_id: params.domain_id,\n                role_id: params.role_id\n            })\n            .from('users')\n            .where({\n                id: params.id\n            })\n            .then(function(res) {\n                callback(null, res)\n            })\n\n    }\n\n    var drop = function(params, callback) {\n        return knex\n            .del()\n            .from('users')\n            .where({\n                id: params.id\n            })\n            .then(function(res) {\n                callback(null, res)\n            })\n    }\n\n    return {\n        usersFindAll: findAll,\n        usersLogin: login,\n        usersFindId: findId,\n        usersCreate: create,\n        usersUpdate: update,\n        usersDrop: drop\n    }\n}\n\n\n//# sourceURL=webpack:///./models/users.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"body-parser\");\n\n//# sourceURL=webpack:///external_%22body-parser%22?");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"child_process\");\n\n//# sourceURL=webpack:///external_%22child_process%22?");

/***/ }),

/***/ "cluster":
/*!**************************!*\
  !*** external "cluster" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cluster\");\n\n//# sourceURL=webpack:///external_%22cluster%22?");

/***/ }),

/***/ "compression":
/*!******************************!*\
  !*** external "compression" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"compression\");\n\n//# sourceURL=webpack:///external_%22compression%22?");

/***/ }),

/***/ "cookie-parser":
/*!********************************!*\
  !*** external "cookie-parser" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"cookie-parser\");\n\n//# sourceURL=webpack:///external_%22cookie-parser%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "express-lowercase-paths":
/*!******************************************!*\
  !*** external "express-lowercase-paths" ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-lowercase-paths\");\n\n//# sourceURL=webpack:///external_%22express-lowercase-paths%22?");

/***/ }),

/***/ "express-session":
/*!**********************************!*\
  !*** external "express-session" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express-session\");\n\n//# sourceURL=webpack:///external_%22express-session%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "helmet":
/*!*************************!*\
  !*** external "helmet" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"helmet\");\n\n//# sourceURL=webpack:///external_%22helmet%22?");

/***/ }),

/***/ "jayson":
/*!*************************!*\
  !*** external "jayson" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"jayson\");\n\n//# sourceURL=webpack:///external_%22jayson%22?");

/***/ }),

/***/ "knex":
/*!***********************!*\
  !*** external "knex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"knex\");\n\n//# sourceURL=webpack:///external_%22knex%22?");

/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"lodash\");\n\n//# sourceURL=webpack:///external_%22lodash%22?");

/***/ }),

/***/ "minimist":
/*!***************************!*\
  !*** external "minimist" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"minimist\");\n\n//# sourceURL=webpack:///external_%22minimist%22?");

/***/ }),

/***/ "morgan":
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"morgan\");\n\n//# sourceURL=webpack:///external_%22morgan%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "response-time":
/*!********************************!*\
  !*** external "response-time" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"response-time\");\n\n//# sourceURL=webpack:///external_%22response-time%22?");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"util\");\n\n//# sourceURL=webpack:///external_%22util%22?");

/***/ })

/******/ });