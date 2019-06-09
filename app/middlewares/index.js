// Internal Import
const path = require('path');
const util = require('util');

// External Import
const bodyParser = require('body-parser');
const compression = require('compression');
const cookieParser = require('cookie-parser');
// Custom Import
const config = require('../config');
const logger = require('../utils/logger');

module.exports = (app, express) => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    // app.use(bodyParser.urlencoded({ extended: true }));
  
    app.use((req,res,next) => {
        if(!req.headers["lan"]){
            req.headers["lan"] = "en";
        }
        global.language = req.headers["lan"];
        next();
    })
    // Enable http logging
    if (config.get('server.enableHttpLogging')) {
        app.use(logger.startHttpLogger());
    }

    // Enable compression
    if (config.get('server.enableCompression')) {
        app.use(compression());
    }

    // Enable public static directory 
    if (config.get('server.enableStatic')) {
        app.use(express.static(path.join(__dirname, config.get('server.static.directory'))));
    }

    // Eanble CORS support
    if (config.get('server.security.enableCORS')) {
        require('./CORS')(app);
    }

    // Enable request body parsing
    // app.use(bodyParser.urlencoded({
    //     extended: true,
    //     limit: config.get('server.bodyParser.limit')
    // }));

    // // Enable request body parsing in JSON format
    // app.use(bodyParser.json({
    //     limit: config.get('server.bodyParser.limit')
    // }));

    // Enable cookie parsing
    app.use(cookieParser(config.get('server.session.cookieSecret')));

    // Enable session creation using MongoDB
    if (config.get('server.enableSessionMongoDB')) {
        require('./sessionMongoDB')(app);
    }

    // Initialize passport module
    if (config.get('server.enablePassport')) {
        require('./passport')(app);
    }

    // Enable request log
    if (config.get('server.enableRequestLog')) {
        require('./requestLog')(app);
    }

    // Setup page not found middlewares
    require('./pageNotFound')(app);

    // Setup error handlers middlewares
    require('./errorHandler')(app);
};