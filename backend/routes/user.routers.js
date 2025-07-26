const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const {registerUser} = require('../controllers/user.controller.js');
const {createUser}=require("../services/user.service.js");




router.post('/register', [
    body('fullName.firstName').notEmpty().withMessage('Username is required'),
     body('fullName.firstName').isLength({min:3}).withMessage('Username is required'),
                          
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
], registerUser); 


module.exports=router;


