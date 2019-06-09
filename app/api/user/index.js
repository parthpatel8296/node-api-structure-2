const express = require('express');
const service = require('./user.service');
const auth = require('../../auth/auth.service');

const router = express.Router();

// user login initiate with mobile | email to check user already exiest or not
router.post('/loginInitiate', service.loginInitiate);

// user login with mobile | email and password 
router.post('/login', service.login);

router.post('/secret', [auth.isAuthenticated, auth.hasRole], service.secret);

// To register user
// router.post('/register/local', service.register);
router.post('/register', service.register);
// To change passoword
// router.post('/changePassword', service.updatePassword);

// To forgot password
// router.post('/forgotPassword', service.forgotpassword);

//  To send otp
// router.post('/sendOtp', service.sendOtp);

// To verify otp
router.post('/verifyOtp', service.verifyOtp);

router.get('/wishlist',[auth.isAuthenticated], service.getWishlist);

module.exports = router;