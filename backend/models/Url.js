const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
  original: { type: String, required: true },
  short: { type: String, unique: true },
  clicks: { type: Number, default: 0 },
  password: { type: String },
  expiry: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Url", urlSchema);