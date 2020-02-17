const express = require('express')
const app = express()

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

app.listen(3000, () => console.log('Server running on port 3000'))
