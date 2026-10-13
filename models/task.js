const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim:true
  },
  discription:{
    type:String,
    required:true,
    trim:true
  }
});

module.exports = mongoose.model("Task",taskSchema);
