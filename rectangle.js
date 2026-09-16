const express = require("express");
const router = express.Router();
router.get("/area", (req, res) => {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    let area = a * b;
    res.json({
        area: area
    });
});
router.get("/perimeter", (req, res) => {
    let a = Number(req.query.a);
    let b = Number(req.query.b);
    let perimeter = 2 * (a + b);
    res.json({
        perimeter: perimeter
    });
});
module.exports = router;

// ab mujhe query ka use karke ese karna hai and aaj sham ko ese padhna hai...