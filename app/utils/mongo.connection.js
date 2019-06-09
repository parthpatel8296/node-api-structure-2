// Internal Import
const util = require('util');

// External Import
const mongoose = require('mongoose');
const logger = require('./logger');

// Custom Import
const config = require('../config');

const uri = config.get('mongodb.host') + config.get('mongodb.database')

// Setting mongoose promise to es6 promise
mongoose.Promise = global.Promise;

// 
mongoose.set('useCreateIndex', true);

// Create the database connection
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

/** CONNECTION EVENTS */

// When successfully connected
mongoose.connection.on('connected', () => {
    logger.info(`Mongoose connected to ${config.get('mongodb.database')} Database`);
    console.info('Start Debugging....');
});

// If the connection throws an error
mongoose.connection.on('error', (error) => {
    logger.error('Mongoose default connection error: ' + error);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
    logger.info('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        logger.debug('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
});