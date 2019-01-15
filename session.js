'use strict'

const crypto = require('crypto')
const fs = require('fs')
const util = require('util')
const uuid = require('uuid/v4')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)
const open = util.promisify(fs.open)
const unlink = util.promisify(fs.unlink)

async function getSessionData(sessionId) {

    const fileName = sessionId + '.json'
    var sessionData = {}
    try {
        var buffer = await readFile(fileName)
        sessionData = JSON.parse(buffer)

    } catch (err) {}
    return sessionData
}

async function storeSessionData(sessionId, data) {
    try {
        const fileName = sessionId + '.json'
        await writeFile(fileName, JSON.stringify(data, null, 4))
    } catch (err) {
        console.log('#error store session data', err)
    }
}

async function deleteSessionData(sessionId) {
    try {
        const fileName = sessionId + '.json'
        await unlink(fileName)
    } catch (err) {
        console.log('#error delete session data', err)
    }
}


module.exports = function() {

        const cookieName = 'session'
        const autoRenewal = true
        const maxAge = 600 * 1000
        const domain = ''
        const httpOnly = false

        return async function(ctx, next) {

            var sessionId = ctx.cookies.get(cookieName)
            console.log(`#received session id ${sessionId}`)

            var sessionData = null
            if (sessionId) {
                sessionData = await getSessionData(sessionId)
                console.log(`#session data ${sessionData}`)

                if (sessionData.cookie && sessionData.expires) {
                    if (sessionData.expires > Date.now() && sessionData.session) {
                        ctx.state.session = Object.assign({}, sessionData.session)
                        console.log(`#ctx.state.session ${ctx.state.session}`)
                    }
                }
            }

            await next()
            //return next().then(function() {

                //ctx.state.session = { auth: true, userId: 7 }
                //ctx.state.session = null

                if (ctx.state.session != null) {

                    const cookieOptions = {
                        overwrite: true,
                        maxAge: maxAge,
                        httpOnly: httpOnly,
                        domain: domain
                    }

                    if (sessionId) {
                        if (autoRenewal) {
                            sessionData.expires = Date.now() + maxAge
                            ctx.cookies.set(cookieName, sessionId, cookieOptions)
                        }
                    } else {
                        sessionId = crypto.createHmac('md5', uuid()).digest('hex')
                        console.log(`#create new session ${sessionId}`)

                        sessionData = {
                            sessionId: sessionId,
                            expiries: Date.now() + maxAge,
                            cookiesOptions: cookieOptions,
                            session: ctx.state.session
                        }
                        ctx.cookies.set(cookieName, sessionId, cookieOptions)
                    }
                    storeSessionData(sessionId, sessionData)
                } else {
                    if (sessionId) {
                        ctx.cookies.set(cookieName, null, {
                            maxAge: 0
                        })
                        deleteSessionData(sessionId)
                        console.log(`#delete session ${sessionId}`)
                    }
                }
            //})

        }
}