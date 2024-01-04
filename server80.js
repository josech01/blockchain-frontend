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
// app.use(express.static(__dirname + '/build'));
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }));

// var indexPage = fs.readFileSync(__dirname + '/build/index.html', 'utf8');

// app.get('*', function (req, res) {
//   return res.send(indexPage);
// });

// https
//   .createServer(
//     {
//       key: fs.readFileSync('privkey.pem'),
//       cert: fs.readFileSync('fullchain.pem'),
//     },
//     app
//   )
//   .listen(PORT, function () {
//     console.log(`Server listening on ${PORT}`);
//   });

http.createServer(app).listen(80, function () {
    console.log('Server is listening on 801 port');
});