const express = require('express');
const checkroles = require('../middleware/rolemiddleware.js');
const Student = require('../models/studentModel.js');
const auth = require('../middleware/authmiddleware.js');

const router = express.Router();

router.use((req, res, next) => {
    console.log("You are at Student Route");
    next();
});

router.delete('/:id', auth, checkroles("admin"), async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        await Student.findByIdAndDelete(req.params.id);

        res.json({
            message: "Student deleted successfully",
            student
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
});

router.post('/api/user', async (req, res) => {
    try {
        const { name, age, course } = req.body;
        const student = await Student.create({
            name,
            age,
            course
        });
        res.status(201).json({
            message: "Student created successfully",
            student
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
});
module.exports = router;