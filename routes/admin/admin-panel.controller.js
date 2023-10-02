// routes/admin/admin-panel.controller.js

const express = require('express');
const router = express.Router();

// Define a route and its handler
router.get('/', (req, res) => {
  // Pass the googleId to the template
  res.render('admin'); // Assuming you can access the user's googleId this way
});

// Middleware to check if the user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/auth/google'); // Redirect to login if not authenticated
}

module.exports = router;
