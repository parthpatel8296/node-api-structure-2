// Internal Imports
const common = require('../utils/common');
const logger = require('../utils/logger');
const constants = require('../utils/constants');

module.exports = (app) => {
	// Check header for token
	app.use((req, res, next) => {
		
		if (!(req.headers['authorization'])) { // Sending header ['x-auth-token'] 
			logger.warn(`Request without token from: ${req.url}`);
			// Forbidden
			res.status(403).send(common.sendErrorResponse(constants.messageKeys.code_4006));
		} else {
			next();
		}
	});
};