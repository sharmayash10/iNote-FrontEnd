const express = require('express');
const routes = express.Router();
const User = require('../models/User')
const {body, validationResult} = require ('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
const JWT_SECRET = 'yash$';

// Creating user 
routes.post('/createuser',[
    body('name', 'please enter a name').isLength({min : 3}),
    body('email', 'please enter an valid email').isEmail(),
    body('password', 'password cannot be blank').isLength({min : 5}),
],async (req, res)=>{
    let success = false;
    {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, error: errors.array()})
        }
    }
    try {
        let user = await User.findOne({email : req.body.email});
        if(user){
            return res.status(400).json({success, error: "This email is already registered"})
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        // res.json(user); 
        const data = {
                id : user.id
        }
        success = true;
        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({success, authtoken})
    } catch (error) {
        res.status(500).json({error : "Internal server error occures. Please try later"})
    }
})

//Authenticate a user using : POST "/api/auth/login". No login will be required
routes.post('/login',[
    body('email','Please enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
],async (req,res)=>{
    let success= false;
    {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({success, error: errors.array()})
        }
    }
    const email = req.body.email;
    const password = req.body.password;
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success, error: "Please enter correct credentials"});
        }
        const passwordCompare = await bcrypt.compareSync(password, user.password);
        if(!passwordCompare){
            return res.status(400).json({success, error: "Please enter correct credentials"})
        }
        const data = {
            id : user.id
    }
    success = true;
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({success, authtoken});
} 
catch (error) {
    res.status(500).json({error : "Internal server error occures. Please try later"})
    console.log(error.message);
}
})

//Getting logged in user detail using : POST "/api/auth/getuser". login will be required
routes.post('/getuser', fetchuser ,async (req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error : "Internal server error occures. Please try later"})
    }
})
module.exports = routes