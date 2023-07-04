//question model
const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionID: {
    type: String,
    required: true,
    unique: true,
  },
  section: {
    type: String,
    ref: "Section",
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  attributes: {
    type: [
      {
        name: { type: String, required: true },
        value: { type: String, required: false },
      },
    ],
    required: true,
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
