
const express = require('express');
const passport = require('passport');
const auth = require('../auth.service');
const router = express.Router();
const passportGoogle = passport.authenticate('googleToken', { session: false });


router.post('/', passportGoogle, (req, res, next) => {
  // Generate token
  if (!req.user)
    return res.status(404).json(send_response(null, true, 'Something went wrong, please try again.'));

  let token = auth.signToken(req.user._id, req.user.role);
  let data = { user: req.user, token: token };
  // res.json({ data: data, is_error: false, message: '' });
  // Respond with token
  return res.json({ data: data, is_error: false, message: '' });
});

module.exports = router;