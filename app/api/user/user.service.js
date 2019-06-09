// Custom Impports
const common = require('../../utils/common');
const controller = require('./user.controller');
const constants = require('../../utils/constants');
const mongoose = require("mongoose");

// To check new user alrady registerd or not
exports.loginInitiate = async (req, res) => {
    try {
        const data =req.body;
        let response = await controller.loginInitiate(data);
        // Success
        res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, response));
    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}




// To register new user
exports.register = async (req, res) => {
    try {
        const data = req.body;
        let response = await controller.register(data);
        if(response && typeof(response) === 'object'){
            res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, response));    
        }
        else{
            res.status(400).send(common.sendSuccessResponse(constants.systemMessage.MobileExists.replace("{0}","Mobile"), response,success = false));
        }
    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}

// To register new user
exports.login = async (req, res) => {
    try {
        const data =req.body;
        let response = await controller.login(data);
        // console.log("controller",response.signToken);
        // Success
    
        res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, response));

    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}

// To register new user
exports.secret = async (req, res) => {
    try {
        console.log('test');
        // Success
        // res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, req.user))

    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}

// exports.forgotPassword = async (req, res) => {
//     try {

//     } catch (error) {
//         // Internal Server error
//         res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
//     }
// }


// exports.changePassword = async (req, res) => {
//     try {

//     } catch (error) {
//         // Internal Server error
//         res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
//     }
// }


// exports.sendOtp = async (req, res) => {
//     try {

//     } catch (error) {
//         // Internal Server error
//         res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
//     }
// }

exports.verifyOtp = async (req, res) => {
    try {
        const data =req.body;
        let response = await controller.verifyOtp(data);
        // Success
        res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, response));
    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}

exports.getWishlist = async (req, res) => {
    try {
        let response = await controller.getWishlist(req.user._id);
        if(!response || response.length <= 0){
            return res.status(200).send(common.sendMessageResponse(constants.systemMessage.GetErrorMessage.replace("{0}","Wishlist")));    
        }
        res.status(200).send(common.sendSuccessResponse(constants.messageKeys.code_2000, response))
    } catch (error) {
        // Internal Server error
        res.status(500).send(common.sendErrorResponse(error.message || constants.messageKeys.code_5002));
    }
}