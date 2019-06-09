const passport = require('passport');
const FacebookTokenStrategy = require('passport-facebook-token');

exports.setup = async (User, config) => {
  // Authenticating User using facebook 
  passport.use('facebookToken', new FacebookTokenStrategy({
    clientID: "",
    clientSecret: "",
    passReqToCallback: true // this is the virtual field on the model
  }, async (req, accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await User.findOne({ 'facebook': profile.id });
      if (!existingUser) {
        let newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          avatar: profile.photos[0].value,
          username: profile.username,
          provider: 'facebook',
          facebook: profile.id,
        });
        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, existingUser);
      }
    } catch (error) {
      done(error, null);
    }
  }
  ));
};
