const mongoose = require("mongoose");

const AuditeSchema = new mongoose.Schema({
  Audite: {
    type: String,
    ref: "Question",
    required: true,
  },
  
});

const Audite = mongoose.model("Audite", AuditeSchema);

module.exports = Audite;
