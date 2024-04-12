const express = require('express');
// const router = express.Router();
const User = require('../model/user.model');

const usernameCheck = async (req, res) => {
    const { username } = req.query;
  
    try {
      const existingUser = await User.findOne({ username });
      const usernameAvailable = !existingUser; // Username is available if no user with this username exists
      res.json({ available: usernameAvailable });
    } catch (error) {
      console.error('Error checking username availability:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    
  }

  module.exports = usernameCheck;