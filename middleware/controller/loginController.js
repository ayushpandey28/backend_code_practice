const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/jwt.js");

const loginUser = async (req, res) => {
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

        const isMatch = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = generateToken(existingUser);
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.SECRET_KEY,
            maxAge:360000 //in millisecond
        }

        )

        return res.status(200).json({
            message: "Login successful",
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        });
    }
};

module.exports = { loginUser };