const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const regUser = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;
        if (!firstName || !email || !password) {
            return res.status(400).json({
                message: "firstName, email, and password are required"
            });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            firstName,
            email,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                firstName: user.firstName,
                email: user.email
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};
module.exports = { regUser };