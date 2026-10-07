const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if (token) {
            verifyToken(token);
        }
        res.clearCookie("token");
        return res.status(200).json({
            message: "Logout successful"
        });
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};