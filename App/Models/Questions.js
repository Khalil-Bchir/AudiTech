const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  attributes: {
    type: [{
      name: { type: String, required: true },
      value: { type: String, required: true },
    }],
    required: true,
  },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;