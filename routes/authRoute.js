const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authRoute = express.Router();

authRoute.post('/signUp', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        if (!name || !email || !password) {
            return res.status(409).json({ isSuccessfully: false, message: 'Validation error' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(412).json({ isSuccessfully: false, message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(200).json({
            isSuccessfully: true,
            message: 'User has successfully created',
            data: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' });
    }
});

//user get
authRoute.get('/signUp', async (req, res) => {
    try {
        const userFind = await User.find()
        if (!userFind) {
            return res.status(404).json({ message: 'No Users' })
        } else {
            res.status(200).json({ isSuccessfully: true, message: 'Successfully Get Users', data: userFind })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error' })
    }
})



//id get
authRoute.get('/profile/:userId', async (req, res) => {
    const id = req.params.userId;

    try {
        const user = await User.findById(id).select("-password");
        if (!user) {
            return res.status(404).json({ isSuccessfully: false, message: 'User not found' });
        }
        res.json({ isSuccessfully: true, data: user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error' });
    }
});



//login 
authRoute.post('/Login', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ message: 'Validation error' });
        }


        if (email === "Admin123@gmail.com" && password === "Admin123") {
            return res.status(200).json({
                isSuccessfully: true,
                message: 'Admin successfully logged in',
                role: 'admin',
            });
        }


        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const isMatchedPassword = await bcrypt.compare(password, existingUser.password);
        if (!isMatchedPassword) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({
            isSuccessfully: true,
            message: 'User successfully logged in',
            role: 'user',
            data: existingUser,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = authRoute;