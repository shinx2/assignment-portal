const mongoose = require("mongoose");

const assignmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true},
    questionsCart: [
        {
          questionId: {
            type: mongoose.Schema.Types.ObjectId, ref: "question",
          },
          status: {
            type: Boolean,
            default: false
          },
        }
      ],
    createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("assignment", assignmentSchema);