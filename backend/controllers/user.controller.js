const User= require('../models/User.js');
const {validationResult} = require('express-validator');
const {createUser}=require("../services/user.service.js")
const validator=require("validator");


module.exports.registerUser = async (req, res) => {





    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, password} = req.body;

    if(!validator.isStrongPassword(password)){
        return res.send("please type strong password");

    }



    const hashedPassword = await User.hashPassword(password);

    try {
        const user = await createUser({
            firstName: fullName.firstName,
            lastName: fullName.lastName,
            email,
            password: hashedPassword 
        });
        if (!user) {
            return res.status(400).json({ message: 'User registration failed' });
        }
        const token = await user.generateAuthToken();
        res.status(201).json({token,user});

        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};