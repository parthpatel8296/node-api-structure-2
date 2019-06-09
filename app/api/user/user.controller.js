// Internal Imports
const util = require('util');
const path = require('path');

// External Imports
const mongoose = require("mongoose");

// Custom Imports
const constants = require('../../utils/constants');
const templatesDir = path.join(__dirname, '../../templates');
const logger = require("../../utils/logger");
const sms = require("../../utils/sms");
const auth = require('../../auth/auth.service');

// Mongoose Models
const User = mongoose.model('user');
const otpModel = mongoose.model('userotp');
const Role = mongoose.model('role');
const userRepository = require("../user/user.repository");
const qrcode = require("qrcode");


// Add | Update user otp
let addAndUpdateOtpDoc = async (data) => {
    try {
        console.log("in otp");
        console.log(data);
        let result = await userRepository.addAndUpdateOtpDoc(data);
        return result;
    } catch (error) {
        logger.error(util.format('Error occured while adding or updating OTP doc, Error: %O', error));
        throw error;
    }
}


// check new user alrady exiest or not
exports.login = async (data) => {
    try {
        const { mobileNumber } = data;
        const { password } = data;
        // Get user by mobile number or email
        
        
        let result = userRepository.login(data);
        
        
    } catch (error) {
        logger.error(util.format(`Error Occured while login user, Error: %O`, error));
        throw error;
    }
};

// user registered with name, mobile, email and password
exports.register = async (data) => {
    try{
        data.isRegistered = false;
        data.qrcode = await qrcode.toDataURL(data.mobileNumber.toString());
        console.log(data);
        let result  = await userRepository.userRegister(data);
        if(result){
            let userObj = {};
            userObj.userName = data.userName;
            userObj.mobileNumber = data.mobileNumber;
            console.log(result);
            userObj.token = userRepository.signToken(data);
            await addAndUpdateOtpDoc(data);
            return userObj;
        }
        else{
            return false;
        }
    } catch (error) {
        logger.error(util.format(`Error Occured while registering user, Error: %O`, error));
        throw error;
    }
};
