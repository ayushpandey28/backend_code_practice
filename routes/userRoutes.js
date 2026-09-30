const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/userModel");

router.post('/createUser', async (req, res) => {
    try {
        const { firstName, email, password, role } = req.body;

        if (!firstName || !email || !password || !role) {
            return res.status(400).json({
                message: "firstName, email, password, and role are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            firstName,
            email,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            message: "User created successfully",
            user
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error creating user",
            error: error.message
        });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "email and password are required"
            });
        }

        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: existingUser._id, role: existingUser.role },
            process.env.JWT_SECRET || "secretkey",
            { expiresIn: "1h" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error logging in",
            error: error.message
        });
    }
});

module.exports = router;
