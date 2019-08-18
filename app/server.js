//server.js
const express = require('express')
const app = express()
const port = 8080
const os = require('os')
const request = require('sync-request') // Required to figure out the public IP
const zeitFormat = require('./zeitFormat.js');
// Set the start time for the container as a constant
const startTime = os.uptime()

// To use the Pug template engine
app.set('view engine', 'pug')

// To serve static files
app.use(express.static('public'))

// Collects the environment data
function environmentData(req) {
  return {
    //socket
    // https://nodejs.org/api/net.html#net_class_net_socket
    socketLocalAddress: req.connection.localAddress.split(':')[3],
    socketLocalPort: req.connection.localPort,
    socketRemoteAddress: req.connection.remoteAddress.split(':')[3],
    socketRemotePort: req.connection.remotePort,
    socketRemoteFamily: req.connection.remoteFamily,
    socketBytesRead: req.connection.bytesRead,
    socketBytesWritten: req.connection.bytesWritten,
    socketBufferSize: req.connection.bufferSize,
    //server
    serverAddress: req.connection.address(),
    //req
    // https://www.tutorialspoint.com/nodejs/nodejs_request_object.htm
    reqOriginalUrl: req.originalUrl,
    reqRoute: req.route,
    reqQuery: req.query,
    //
    publicIP: request('GET', 'https://api.ipify.org').getBody('utf8'), // Figure out the public IP
    //os
    //https://nodejs.org/api/os.html
    osHostname: os.hostname(),
    osNetworkInterfaces: os.networkInterfaces(),
    osPlatform: os.platform(),
    osRelease: os.release(),
    osCpus: os.cpus(),
    osTotalmem: os.totalmem(),
    osFreemem: os.freemem(),
    osUptime: os.uptime()-startTime,
    osUptimeLong: zeitFormat.uptime(os.uptime()-startTime),
    osUserInfo: os.userInfo(),
    osHomedir: os.homedir(),
  }
}

// Provides the environment data as JSON object via REST
app.get(['/json','/rest'], function (req, res) {
  // let remoteAddress = req.connection.remoteAddress.split(':')[3];
  res.send(environmentData(req))
})

// Provides the environment data as JSON object via HTTP
app.get(['/httpjson','/httprest'], function (req, res) {
  res.render('httpjson', {
    environmentData: JSON.stringify(environmentData(req))
  })
})

// Provides the environment data as user friendly HTML via HTTP
app.get('/', function (req, res) {
  res.render('custom', {
    environmentData: environmentData(req)
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))