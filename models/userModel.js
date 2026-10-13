const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model("userModel", userSchema);
