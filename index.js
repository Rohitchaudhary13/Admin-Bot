const express = require('express');
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose'); // No need for native MongoDB client
const config = require('./config');
const path = require('path');
const app = express();
const db = require('./db'); // Import the database connection

// Set up session
app.use(
  session({
    secret: config.session.secret,
    resave: false,
    saveUninitialized: true,
  })
);

// Initialize Passport.js
app.use(passport.initialize());
app.use(passport.session());
// API endpoint to create or update bot settings
app.put('/api/botSettings', async (req, res) => {
  try {
    const { botName, botDescription, botStatus } = req.body;

    // Find the user by googleId
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create or update bot settings for the user
    const botSettings = await BotSettings.findOneAndUpdate(
      { user: user._id },
      { botName, botDescription, botStatus },
      { upsert: true, new: true }
    );

    return res.json({ message: 'Bot settings updated successfully', botSettings });
  } catch (error) {
    console.error('Error updating bot settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

// API endpoint to get bot settings
app.get('/api/botSettings', async (req, res) => {
  try {
    const { googleId } = req.query;

    // Find the user by googleId
    const user = await User.findOne({ googleId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the bot settings for the user
    const botSettings = await BotSettings.findOne({ user: user._id });

    return res.json(botSettings);
  } catch (error) {
    console.error('Error fetching bot settings:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
const userSchema = new mongoose.Schema({
  googleId: String,
  bots: [
    {
      botName: String,
      botDescription: String,
      botStatus: String,
      // Add other bot settings fields as needed
    },
  ],
  // Add other user fields as needed
});

// Define the User model and schema
const User = mongoose.model('User', new mongoose.Schema({
  googleId: String,
  botDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bot',
  },
  // Add other user fields as needed
}));


const Bot = mongoose.model('Bot');

// Create a new bot
const newBot = new Bot({
  botName: 'xyz',
  botDesc: 'description',
  botStatus: 'active',
});

// Save the bot to MongoDB
newBot.save((err, savedBot) => {
  if (err) {
    console.error('Error saving bot:', err);
  } else {
    // Create a new user
    const newUser = new User({
      googleId: '104245015088603345709',
      botDetails: savedBot._id, // Reference to the saved bot
    });

    // Save the user to MongoDB
    newUser.save((userErr, savedUser) => {
      if (userErr) {
        console.error('Error saving user:', userErr);
      } else {
        console.log('Bot and User saved successfully:', savedBot, savedUser);
      }
    });
  }
});



// Configure Passport.js to use Google OAuth2
passport.use(
  new GoogleStrategy(
    {
      clientID: config.google.clientID,
      clientSecret: config.google.clientSecret,
      callbackURL: config.google.callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await User.findOne({ googleId: profile.id });
        if (!user) {
          const newUser = new User({ googleId: profile.id, botSettings: [] });
          await newUser.save();
          done(null, newUser);
        } else {
          done(null, user);
        }
      } catch (err) {
        done(err);
      }
    }
  )
);

// Serialize and deserialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
  .then((user) => {
    done(null, user);
  })
  .catch((err) => {
    done(err);
  });
});

// Define your routes and controllers here
const authRouter = require('./routes/auth/auth.controller.js');
const adminPanelRouter = require('./routes/admin/admin-panel.controller.js');
const botSettingsRouter = require('./routes/botSettingsRoutes'); // Add this line to include the botSettingsRouter

app.use('/auth', authRouter);
app.use('/admin', adminPanelRouter);
app.use('/api', botSettingsRouter); // Mount the botSettingsRouter at the /api endpoint


// Set the 'views' directory for EJS templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
