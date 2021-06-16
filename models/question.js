const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    question: { type: String, required: true },
    answer: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    isCorrect: {type:Boolean, default: false}
});
module.exports = mongoose.model("question", questionSchema);