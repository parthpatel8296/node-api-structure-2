// Internal Imports
const util = require('util');
const fs = require("fs");
const path  = require("path");
// External Imports
const mongoose = require("mongoose");
// Custom Imports
const logger = require('./logger');

/**
 * @description Common function to send success response
 * @param {String} message hold success message
 * @param {Object} data hold data that to send.By default it is blank object.
 * @param {Object} meta hold extra information i.e total record.By default it is blank object.
 * @param {Object} options to hold option.By default it is blank object.
 * @returns {Object} return success object
 * @author Parth Patel [04-04-2019]
 */
exports.sendSuccessResponse = (message = "", data = {}, meta = {}, options = {},success = true) => {

    // creating response object to send success
    const responseObject = {
        isError: false,
        isSuccess : success,
        message: message,
        data: data,
        meta: meta
    };

    Object.assign(responseObject, options);

    return responseObject;

}

/**
 * @description Common function to send error response if error occured.
 * @param {String} message to hold error message
 * @param {Object} options to hold option.By default it is blank object
 * @returns {Object} return error object
 * @author Parth Patel [04-04-2019]
 */
exports.sendErrorResponse = (message = "", options = {}) => {

    // creating response object to send error
    const responseObject = {
        isError: true,
        message: message,
        data: {},
        meta: {}
    };

    Object.assign(responseObject, options);

    return responseObject;
}


/**
 * @description Common function to send error response if error occured.
 * @param {String} message to hold error message
 * @param {Object} options to hold option.By default it is blank object
 * @returns {Object} return error object
 */
exports.sendMessageResponse = (message = "", options = {}) => {

    // creating response object to send error
    const responseObject = {
        isError: false,
        message: message,
        data: [],
        meta: {}
    };

    Object.assign(responseObject, options);

    return responseObject;
}
