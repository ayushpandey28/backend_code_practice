const jwt = require("jsonwebtoken");
const generateToken = (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email
        },
        process.env.JWT_SECRET || "secretkey",
        {
            expiresIn: "1h"
        }
    );
};

const generateTokenAccess = (user) => {
    return jwt.sign(
        {
            id: user._id
        },
        process.env.SECRET_KEY,
        {
            expiresIn: "1h"
        }
    );
};
module.exports = {generateToken,generateTokenAccess};

