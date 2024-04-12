const express = require('express');
const User = require('../model/user.model');


const emailCheck = async (req, res) => {
    const { email } = req.query;
  
    try {
      const existingUser = await User.findOne({ email });
      const emailAvailable = !existingUser; // Email is available if no user with this email exists
      res.json({ available: emailAvailable });
    } catch (error) {
      console.error('Error checking email availability:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
    
  }
  module.exports = emailCheck;
