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
  },
  user:{
    userid:mongoose.Schema.Types.ObjectId,
    ref:User
  }
});
module.exports = mongoose.model("TaskCreate",taskSchema);

