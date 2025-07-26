const User=require("../models/User.js");


async function createUser({firstName, lastName, email, password}) {
    try {

        if(!firstName  || !email || !password) {
            throw new Error("All fields are required");
        }


        const user = new User({
            fullName: {
                firstName,
                lastName
            },
            email,
            password
        });
        await user.save();
        return user;
    } catch (error) {
        throw new Error("Error creating user: " + error.message);
    }

};

module.exports={createUser};