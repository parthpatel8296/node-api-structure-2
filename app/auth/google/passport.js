const passport = require('passport');
const GooglePlusTokenStrategy = require('passport-google-plus-token');

exports.setup = async (User, config) => {
  passport.use('googleToken', new GooglePlusTokenStrategy({
    clientID: "gf0i91vechfl1cmqunc2hin1c0dqjc9s.apps.googleusercontent.com",
    clientSecret: "5txvLR3mpT-c6eXDIszUdf1K"
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let existingUser = await User.findOne({ 'google': profile.id })
      if (!existingUser) {
        let newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          role: 'user',
          username: profile.username,
          provider: 'google',
          google: profile.id
        });

        await newUser.save();
        return done(null, newUser);
      } else {
        return done(null, existingUser);
      }
    } catch (error) {
      return done(error, null);
    }
  }
  ));
};
