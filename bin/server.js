const path = require('path');
const http = require('http');
const mime = require('mime-types')
const express = require('express');
const compression = require('compression');
const app = express();
const PORT = 8080;
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist'), {
  maxAge: '1y',
  setHeaders: function (res, path) {
    if (mime.lookup(path) === 'text/html') {
      res.setHeader('Cache-Control', 'public, max-age=0')
    }
  }
}));
var server = http.createServer(app);
server.listen(PORT, function () {
  console.log("Listening on http://127.0.0.1:%j", server.address().port);
});