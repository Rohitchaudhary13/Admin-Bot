// routes/botSettingRoutes.js
const express = require('express');
const router = express.Router();
const BotSettings = require('../models/botSettings');

// Create a new bot setting associated with the user
router.post('/api/botSettings', async (req, res) => {
  console.log('Received GET request for /api/botSettings 2'); 
  try {
    // Get the user's ID from the authenticated user's session
    const userId = req.user._id; // Assuming you have a user object in the request

    // Create a new bot setting associated with the user
    const newBotSetting = new BotSettings({
      ...req.body, // Include bot settings from the request body
      user: userId, // Associate the bot setting with the user
    });

    const savedBotSetting = await newBotSetting.save();
    res.json(savedBotSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get bot settings for the authenticated user
router.get('/api/botSettings', async (req, res) => {
  try {
    const settings = await BotSettings.find();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update bot settings by ID (PUT request)
router.put('/api/botSettings/:id', async (req, res) => {
  try {
    const updatedBotSetting = await BotSettings.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedBotSetting);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete bot settings by ID (DELETE request)
router.delete('/api/botSettings/:id', async (req, res) => {
  try {
    await BotSettings.findByIdAndRemove(req.params.id);
    res.json({ message: 'Bot setting deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
