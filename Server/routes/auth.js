const express = require('express');
const passport = require('passport');
const router = express.Router();

// Google Auth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// Facebook Auth
router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// GitHub Auth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: process.env.CLIENT_URL }),
  (req, res) => {
    res.redirect(process.env.CLIENT_URL);
  }
);

// Logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: 'Logout failed' });
    }
    res.json({ message: 'Logged out successfully' });
  });
});

// Get current user
router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      user: {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        provider: req.user.provider
      }
    });
  } else {
    res.status(401).json({ error: 'Not authenticated' });
  }
});

module.exports = router;