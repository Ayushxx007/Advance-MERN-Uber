const mongoose =require("mongoose");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const validator = require('validator');
const userSchema = new mongoose.Schema({
    fullName: {

        firstName:{
             type: Object,
            required: true,
            minlength: [3,'First name must be at least 3 characters long'],
            maxlength: [50,'First name must be at most 50 characters long']
        },
        lastName: {
            type: String,
            minlength: [3,'First name must be at least 3 characters long'],
            maxlength: [50,'First name must be at most 50 characters long']
        }
       
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [100, 'Email must be at most 100 characters long'],
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please fill a valid email address'],
        validate:{
            validator: function(value) {
                return validator.isEmail(value);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true,
        select:false, // Exclude password from queries by default
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [100, 'Password must be at most 100 characters long'],
        validate: {
            validator: function(value) {
                return validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 1,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 0
                });
            }
    }
},

    socketId:{
        type: String,
        default: null


    },


},{ timestamps: true });

userSchema.methods.generateAuthToken = async function() {

    const token = jsonwebtoken.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return token;
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

const User= mongoose.model('User', userSchema);
module.exports = User;