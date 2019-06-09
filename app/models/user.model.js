// Internal Imports
const crypto = require('crypto');

// External Imports
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// Custom Imports
const config = require('../config');

const Schema = mongoose.Schema;

let schemaOptions = {
    toObject: { virtuals: true },
    toJSON: { virtuals: false },
    timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' }
};

let UserSchema = new Schema({
    userName: { type: String, default: "" },
    email: { type: String, lowercase: true },
    salt: String,
    qrcode : String,
    images: Array,
    hashedPassword: String,
    profilePicture: { type: String, default: "" },
    mobileNumber: { type: String, default: "" },
    role: {
        type: String
    },
    // Always put flag at last in schema design
    isEmailVerified: { type: Boolean, default: false },
    isMobileVerified: { type: Boolean, default: false },
    isRegistered: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    isDeleted: { type: Boolean, default: false },
    isBlocked : { type : Boolean, default : false}
}, schemaOptions);

// Virtuals
UserSchema
    // putting non-sensitive data in cookies 
    .virtual('token')
    .get(function () {
        return {
            '_id': this._id,
            'role': this.role,
            'email': this.email,
            'name': this.userName,
            'mobileNumber': this.mobileNumber
        }
    });
    
UserSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashedPassword = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });


// Validation


// Hooks
UserSchema
    .pre('save', function (next) {
        this.updatedDate = Date.now();
        next();
    });

// Methods
UserSchema.methods = {
    /**
     * @description To sign token using JWT
     * @returns {String} signed token
     */
    signToken: function (plainText) {
        return jwt.sign(this.token, config.get('server.JWT.tokenSecret'), { expiresIn: config.get('server.JWT.expireTime') });
    },
    /**
     * @description To check if the password are same for authentication
     * @param {String} plainText holds the password
     * @returns {Boolean} returns true is password are same else return false
     */
    authenticate: function (plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
    },
    /**
     * @description To make salt
     * @returns {String} 
     */
    makeSalt: () => {
        return crypto.randomBytes(16).toString('base64');
    },
    /**
     * @description To encrypt password
     * @param {String} password
     * @returns {String} returns the encrypted password
     */
    encryptPassword: function (password) {
        if (!password || !this.salt) {
            return '';
        }
        let salt = new Buffer(this.salt, 'base64');
        let pwd = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('base64');
        return pwd;
    }
};

module.exports = mongoose.model('user', UserSchema);
