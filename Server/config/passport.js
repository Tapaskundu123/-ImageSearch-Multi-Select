const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Google Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'google',
          providerId: profile.id
        });

        if (!user) {
          user = await User.create({
            provider: 'google',
            providerId: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// Facebook Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: '/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'email', 'photos']
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'facebook',
          providerId: profile.id
        });

        if (!user) {
          user = await User.create({
            provider: 'facebook',
            providerId: profile.id,
            email: profile.emails ? profile.emails[0].value : null,
            name: profile.displayName,
            avatar: profile.photos ? profile.photos[0].value : null
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

// GitHub Strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'github',
          providerId: profile.id
        });

        if (!user) {
          user = await User.create({
            provider: 'github',
            providerId: profile.id,
            email: profile.emails ? profile.emails[0].value : null,
            name: profile.displayName || profile.username,
            avatar: profile.photos ? profile.photos[0].value : null
          });
        }

        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;