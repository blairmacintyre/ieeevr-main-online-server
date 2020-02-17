const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
`
const app = express()

// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const targetBaseUrl = 'http://hubs.ieeevr.online';

function handleRedirect(req, res) {
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}

app.get('/.well-known/acme-challenge/AFXirU3FJ2twGUkPJLt-AZ2IdouvcAQU0peSIvegJtI', (req,res) => {
  res.send("AFXirU3FJ2twGUkPJLt-AZ2IdouvcAQU0peSIvegJtI.5st7B8fZLpP9RAISxL2Qyv1F-LUAzk_ernUbaqXPriM")
})

app.get('/', handleRedirect);

//app.get('/', (req, res) => {
//  res.send('HEY!')
//})

// Starting both http & https servers
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, () => console.log('HTTP Server running on port 3000'))
httpsServer.listen(3001, () => console.log('HTTPS Server running on port 3001'))
