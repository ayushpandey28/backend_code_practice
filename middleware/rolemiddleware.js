
const checkroles = (...allowedRoles) => (req, res, next) => {
    const role = req.headers.role
    if (req.user) {
        return res.status(401).json({
            message: "Role is required"
        })
    }
    if (allowedRoles.includes(req.user.role)) {
        return next()
    }
    return res.status(403).json({
        message: "Not allowed"
    })
}
module.exports = checkroles
