const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

exports.setup = (User, config) => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password' // this is the virtual field on the model
    }, (username, password, done) => {

        User.findOne({ $or: [{ "mobile_no": username }, { "email": username }] }, function (err, user) {
            if (err)
                return done(err);

            if (!user) {
                return done(null, false, { message: 'user does not exist' });
            }
            if (!user.authenticate(password)) {
                return done(null, false, { message: 'This password is not correct.' });
            }
            return done(null, user);
        });
    }
    ));
};