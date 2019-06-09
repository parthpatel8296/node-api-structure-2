// Internal Import 
const util = require('util');

// External Import
const express = require('express');

// Custom Import
const config = require('./config');
const logger = require('./utils/logger');

// Initialize express app
const app = express();

// Setup mongoDB 
require("./utils/mongo.connection");

// Setup mongoDB models
require('./models')();

// Setup Middlewares
require('./middlewares/index')(app, express);

// Setup routes
require('./routes')(app);

// require('./utils/seed');

// Creating http server
const server = require('http').createServer(app);

let socketio;

// Enable websockets 
if (config.get('server.enableWebSockets')) {
    // Using server with websockets
    socketio = require('socket.io')(server);
    // Setup Sockets
    require('./utils/socketio')(socketio);
}

// Set port.
app.set('port', config.get('server.http.port'));

// Set IP
app.set('ip', config.get('server.http.ip'));
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
// To check api is running in browser
app.get('/', (req, res) => {
    res.status(200).send(`Fakdoo-Node-Api running on PORT: ${app.get('port')}`);
});

// Start HTTP server
server.listen(app.get('port'), app.get('ip'), () => {
    logger.info(`Express server listening on Server:  http://${app.get('ip')}:${app.get('port')} with ProcessID: ${process.pid}`);
    logger.info(`Environment: ${config.get('env')}`);
});

// To handle uncaught exception
process.on('uncaughtException', (err) => {
    logger.error(util.format('Caught exception, Error: %O', err));
});

// To handle unhandle rejection
process.on('unhandledRejection', (reason, p) => {
    logger.error('Unhandled Rejection at:', p, 'reason:', reason);
});
