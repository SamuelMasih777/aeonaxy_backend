const express = require('express');

const User = require('../model/user.model');

const jwt = require('jsonwebtoken');

const loginHandler = async(req,res)=>{
    try {
        
        const user = await User.findOne({email: req.body.email})
        if (!user) {
            return res.status(401).json({msg:"Incorrect Mobile Number"});
        }
        
        const decodedPassword = user.password;        

        if (decodedPassword !== req.body.password) {
            return res.status(401).json({msg:"Incorrect Password"});
        }
        const { password, ...rest} = user._doc;
        const accessToken = jwt.sign({username:user.username},process.env.ACCESS_TOKEN)
        res.json({...rest, accessToken});

    } catch (error) {
        console.log(error);
    }
}
module.exports = loginHandler