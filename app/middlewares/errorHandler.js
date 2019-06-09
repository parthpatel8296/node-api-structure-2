// Custom Imports
const logger = require('../utils/logger');
const common = require('../utils/common');
const constants = require('../utils/constants');

module.exports = (app) => {
    // Middleware to handle error in application
    app.use((error, req, res, next) => {
        if (error) {
            logger.error(`Error Occured while call route` + error);
            return res.status(500).send(common.sendErrorResponse(constants.messageKeys.code_5002));
        }
        next();
    });
}