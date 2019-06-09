const mongoose = require("mongoose");
const User = require("../../models/user.model");
const UserOtp = require("../../models/user.otp.model");
const jwt = require("jsonwebtoken");
const config = require('../../config');
const sms = require("../../utils/sms");

exports.userRegister = async(data) => {
    try{
        let user = await User.findOne({"mobileNumber": data.mobileNumber});
        if(user){
            return false;
        }
        else{
            let result = await User.create(data);
            if(result){
                return true;
            }
            else{
                return false;
            }
        }
    }
    catch(err){
        throw err;
    }
}

exports.signToken = (data) => {
    try{
        let userObj = {};
        userObj._id = data._id;
        userObj.mobileNumber = data.mobileNumber;
        userObj.userName = data.userName;
        userObj.role = data.role;
        return jwt.sign(userObj,config.get('server.JWT.tokenSecret'), { expiresIn: config.get('server.JWT.expireTime') });
    }
    catch(err){
        throw err;
    }
}


exports.login = async(data) => {
    try{
        let existingUser = await User.findOne({ $or: [{ "mobileNumber": mobileNumber }], isMobileVerified : true, isRegistered : true });
        if(existingUser){
            if(existingUser.authenticate(password)){  
                let userObj = {};              
                let token = this.signToken(existingUser);
                existingUser = existingUser.toObject();
                userObj.token = token;
                userObj.userName = existingUser.userName;
                userObj.role = existingUser.role;
                userObj.mobileNumber = existingUser.mobileNumber;
                // delete hashedPassword and salt from user response
                delete existingUser.hashedPassword;
                delete existingUser.salt;
                return existingUser;
            }else{
                return false;
            }
        }
        else{
            return false;
        }
    }
    catch(err){
        throw err;
    }
}

exports.addAndUpdateOtpDoc = async(data) => {
    try {
        console.log(data);
        let otpDoc;
        // let otp = // make generate otp common method
        let otp = parseInt(Math.random() * 9000);
        // To find otp by mobile number
        otpDoc = await UserOtp.findOne({ userId : data._id});
        console.log(otpDoc);
        let userOtpData = {
            userId : data._id,
            otp : otp,
            otpSentDate : new Date()
        }
        
        let newOtpDoc = await UserOtp.create(userOtpData);
        let smsData = {};
        smsData.otp = otp;
        smsData.mobileNumber = data.mobileNumber;
        sms.sendOTPSMS(smsData);
        return newOtpDoc;
    } catch (error) {
        throw error;
    }
}
