const express = require('express');
var compression = require('compression');
var cors = require('cors');
const PORT = process.env.PORT || 443;
var https = require('https');
var http = require('http');
var fs = require('fs');
const app = express();
require('dotenv').config();

app.use(compression());
app.use((req, res, next) => {
  if (req.protocol === 'http') {
    return res.redirect(301, `https://${req.headers.host}${req.url}`);
  }

  next();
});

app.use(express.static(__dirname + '/build'));

https
  .createServer(
    {
      key: fs.readFileSync('/etc/letsencrypt/live/tyrh.io/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/tyrh.io/fullchain.pem'),
      ca: fs.readFileSync('/etc/letsencrypt/live/tyrh.io/chain.pem'),
    },
    app
  )
  .listen(PORT, function () {
    console.log(`Server listening on ${PORT}`);
  });

http.createServer(app).listen(80, function () {
  console.log('Server is listening on 80 port');
});
