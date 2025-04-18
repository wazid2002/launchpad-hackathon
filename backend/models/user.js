const mongoose = require("mongoose");

const userSchema= new mongoose.Schema({
    userId:{
        type:"string",
        required:true,
        unique:true
    },
    role: { type: String, enum: ['user', 'mentor', 'admin'], default: 'user' },
    totalViews:{
        type:"string"
    },
    connections:{
        type:"string"
    },
    mentorFeedback: [
        {
          mentorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
          mentorName: String,
          comment: String,
          date: { type: Date, default: Date.now }
        }
      ]

});

module.exports = mongoose.model("user",userSchema);