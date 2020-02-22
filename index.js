const fs = require('fs');
const http = require('http');
const https = require('https');

const express = require('express');
const app = express()

const targetBaseUrl = 'http://hubs.ieeevr.online';

// this handles our Lets Encrypt https cert challenge.
app.get('/.well-known/acme-challenge/AFXirU3FJ2twGUkPJLt-AZ2IdouvcAQU0peSIvegJtI', (req,res) => {
  res.send("AFXirU3FJ2twGUkPJLt-AZ2IdouvcAQU0peSIvegJtI.5st7B8fZLpP9RAISxL2Qyv1F-LUAzk_ernUbaqXPriM")
})


// This method and the top level redirect are temporary.  We'll get rid of them
// when we have a proper top level server
function handleRedirect(req, res) {
  console.log(req.originalUrl);
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}
app.get('/', handleRedirect);

// to try out static files, uncomment this (and comment out the redirect above) 
// and put your files in a new directory "public" that you create at the top level of the repo

// app.use(express.static('public'))


// Starting both http & https servers
const httpServer = http.createServer(app);
httpServer.listen(3000, () => console.log('HTTP Server running on port 3000'))

/////////
// NOTE:  Comment out the next rest of the file if developing locally, since none of the certs
// will be accessible
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ieeevr.online/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(3001, () => console.log('HTTPS Server running on port 3001'))
