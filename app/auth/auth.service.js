// Internal Imports
const util = require('util');

// External Imports
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

// Custom Imports
const config = require('../config');
const logger = require('../utils/logger');
const common = require('../utils/common');
const constants = require('../utils/constants');

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
exports.isAuthenticated = (req, res, next) => {
    try {
        if (!(req.headers['authorization'])) {
            logger.warn(`Request without token from: ${req.url}`);
            // Forbidden
            res.status(403).send(common.sendErrorResponse(constants.messageKeys.code_4006));
        } else {
            console.log("Else authorization");
            let token = req.headers['authorization']
            const decoded = jwt.verify(token, config.get('server.JWT.tokenSecret'));
            req.user = decoded;
            console.log("user is " + req.user);
            next();
        }
    } catch (error) {
        logger.error(util.format('Error occured while authentication, Error: %O', error));
        res.status(403).send(common.sendErrorResponse(constants.messageKeys.code_4005));
    }
}




