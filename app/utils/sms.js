// Internal Imports
const util = require('util');

// External Imports
const https = require('https'); // check axios or request library instead(recommended: axios)

// Custom Imports
const config = require("./../config");
const logger = require("./logger");

/**
 * @description function to send mail using NodeMailer.
 * @param {Object} maildata data for send mail To, Subject, Message.
 * @returns {Object/Error} return result of sendgrid mail method or error
 * @author parth Patel [05-04-2019]
 */
exports.sendOTPSMS = (smsData) => {
    try {
        // console.log(smsData,config.get('sms.smsApiUrl'));  // Remove This line and Remove commenting below code for check send sm
        let apiUrl = config.get('sms.smsApiUrl')  + config.get('sms.smsApiKey') + '/SMS/'  + smsData.mobileNumber + '/' + smsData.otp;
        console.log(apiUrl);
        https.get(apiUrl, (resp) => {
            return resp;
        }).on("error", (err) => {
            logger.error(util.format('Error Occured while sending sms, Error: %O', err));
        });
    } catch (error) {
        logger.error(util.format('Error Occured while sending sms, Error: %O', error));
        throw error;
    }
}
