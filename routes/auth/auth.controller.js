// routes/auth/auth.controller.js
const express = require('express');
const passport = require('passport');

const router = express.Router();

// Google OAuth2 login
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// Google OAuth2 callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/admin');
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

module.exports = router;