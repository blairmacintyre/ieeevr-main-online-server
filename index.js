const express = require('express')
const app = express()

const targetBaseUrl = 'http://ieeevr.org/2020/';

function handleRedirect(req, res) {
  const targetUrl = targetBaseUrl + req.originalUrl;
  res.redirect(targetUrl);
}

app.get('*', handleRedirect);

//app.get('/', (req, res) => {
//  res.send('HEY!')
//})

app.listen(3000, () => console.log('Server running on port 3000'))
