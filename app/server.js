const express = require('express')
const app = express()
const os = require('os');
const ip = require('ip');
const defaultGateway = require('default-gateway');
const publicIp = require('public-ip');
const zeitFormat = require('./zeitFormat.js');
const startZeit = os.uptime();
const port = 8080;

function werteListe(remoteAddress, remotePort, publicIp) {
  let body = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Whoami?</title>
  </head>
  <body style="font-family: 'monospace', 'Lucida Console'; font-size:11pt; color:#044a71">
    <p>
    <span style="font-weight: bold;">Docklab: Docker + Kubernetes Lab </span><br /> 
    <span style="color:#044a71; font-weight: bold;">
    ================================
    </span>
    <br />
    Container hostname:&nbsp  <span style="font-weight: bold; color:#ff0000">${os.hostname() }</span> <br />
    Container uptime:&nbsp&nbsp&nbsp ${zeitFormat.uptime(os.uptime-startZeit)}<br />
    <br />
    Locale address:&nbsp&nbsp&nbsp&nbsp&nbsp ${ip.address()} (port:${port})<br />
    Standard gateway:&nbsp&nbsp&nbsp ${defaultGateway.v4.sync().gateway} (${defaultGateway.v4.sync().interface})<br />
    Remote address&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${remoteAddress}  (port:${remotePort})  <br />
    Public address:&nbsp&nbsp&nbsp&nbsp&nbsp ${publicIp}<br />
    <br />
    Operation system:&nbsp&nbsp&nbsp ${os.platform()}/${os.release()} <br />
    Total memory:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${os.totalmem()}<br />
    Free memory:&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp ${os.freemem()}<br />
    </p>
  </body>
</html>`;
  return body
}

app.get('/', (req, res) => {
  let remoteAddress = req.connection.remoteAddress.split(':')[3];
  let remotePort = req.connection.remotePort;
  res.set('Content-Type', 'text/html; charset = utf-8');
  (async () => {
    res.send(werteListe(remoteAddress, remotePort, await publicIp.v4()));
  })();
})
app.listen(port, () => console.log(`Server running at internal Port ${port}`))