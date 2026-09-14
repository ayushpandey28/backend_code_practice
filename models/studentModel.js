const mongoose = require('mongoose');
const studentSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    course: {
        type: String,
        required: true
    }
});

module.exports = studentSchema;