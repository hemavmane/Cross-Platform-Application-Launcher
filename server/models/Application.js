const mongoose = require("mongoose");

const ApplicationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  exePath: { type: String, required: true },
  parameter: { type: String, default: "" }
},{timestamps:true});

module.exports = mongoose.model("Application", ApplicationSchema);
