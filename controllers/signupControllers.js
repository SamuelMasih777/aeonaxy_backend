const express = require("express");
const User = require("../model/user.model");
const jwt = require ('jsonwebtoken');
const { Resend } = require('resend');

const resend = new Resend('re_doziocYP_PVwUm6CBUEEwQgU5QoNQkxx1'); // Replace 'your_api_key' with your actual Resend API key

const signupHandler = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image, // URL of the image
      location: req.body.location,
      selectedOptions: req.body.selectedOptions,
    });

    const savedUser = await newUser.save();

    const { password, ...rest} = savedUser._doc;
    const accessToken = jwt.sign({username:savedUser.username}, process.env.ACCESS_TOKEN);

    // Send confirmation email using Resend
    const emailResponse = await resend.emails.send({
      from: 'onboarding@resend.dev', 
      to: 'samuelmasih.sls777@gmail.com',
      subject: 'Thanks for Signing Up with Dribbble', 
      html: `<p>Hey! ${savedUser.name},<br/><br/>Explore the latest designs on Dribbble.<br/><br/>Thank you for signing up on Dribbble!</p>`, 
    });
    
    console.log('Email response:', emailResponse);
    
    // Check if email was sent successfully
    if (emailResponse.status === 'success') {
      console.log('Email sent successfully');
    }
    res.status(201).json({...rest, accessToken});
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Could not save user" });
  }
};

module.exports = signupHandler;
