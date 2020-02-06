const http = require('http');
const app = require('./app'); // app file include
var globalVariable = require('./nodemon.js');
const port = process.env.PORT || globalVariable.port;
console.log('port ',port);
const server = http.createServer(app);

server.listen(port);
