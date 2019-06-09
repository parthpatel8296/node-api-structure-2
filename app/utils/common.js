// Internal Imports
const util = require('util');
const fs = require("fs");
const path  = require("path");
// External Imports
const mongoose = require("mongoose");
// Custom Imports
const logger = require('./logger');
const AdsLevel = require("../models/adslevel.model");
const Category = require("../models/category.model");
const UserWishList = require("../models/user.wishlist.model");
const Mailer = require("../utils/mailer");


/**
 * @description To generate next sequence value 
 * @param {String} sequenceName Name of model for which sequece is generating
 * @returns {Number} return next sequence value
 * @author Aftab Alam [03 April,2019]
 */
exports.getNextSequenceValue = async (sequenceName) => {
    try {
        let sequenceDocument;
        // To get counter model
        let counterModel = mongoose.model('counter');
        // Updating sequence number by one
        sequenceDocument = await counterModel.findOneAndUpdate({
            _id: sequenceName
        }, {
                $inc: {
                    sequence_value: 1
                }
            }, {
                new: true
            });
        if (!sequenceDocument) {
            let counter = new counterModel({
                _id: sequenceName
            });
            sequenceDocument = await counter.save();
        }
        logger.info(`Sequence Value: ${sequenceDocument.sequence_value}`)
        return sequenceDocument.sequence_value;
    } catch (error) {
        logger.error(`Error Occured while updating sequence document ${error}`);
        throw error;
    }
};

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


/**
 * @description Common function to get unique id for ad.
 * @param {String} length for no of characters to generate unique id
 * @returns {Object} return unique id
 */
exports.makeid = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/**
 * @description Common function to get no of days between today and particular date.
 * @param {String} date to hold date
 * @returns {Object} return difference in terms of no of days
 */
exports.getDaysDiff = (date) => {
    try{
        const oneDay = 24*60*60*1000;
        console.log(date);
        let postedDateYear = date.getFullYear();
        let postedDateMonth = date.getMonth();
        let postedDateDay = date.getDate();
        const days = Math.round(Math.abs(new Date(postedDateYear,postedDateMonth,postedDateDay).getTime() - new Date(Date.now()).getTime())/(oneDay));
        return days;
    }
    catch(err){
        throw err;
    }

}