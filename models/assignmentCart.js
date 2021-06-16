const mongoose = require("mongoose");

const assignmentCartSchema = mongoose.Schema({
  userId:{
    type: mongoose.Schema.Types.ObjectId, ref: "user", required: [true, "userId is required"]
  },
  assignmentsCart: [
    {
      assignmentId: {
        type: mongoose.Schema.Types.ObjectId, ref: "assignment"
      },
      latestScore: {type: Number, default: 0},
      status: {
        type: Boolean,
        default: false
      },
    }
  ],
  createdAt: { type: Date, default: Date.now },
});
  
module.exports = mongoose.model("assignmentcart", assignmentCartSchema);
