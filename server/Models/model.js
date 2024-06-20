// backend/Models/model.js
const mongoose = require('mongoose');

const systemDetailSchema = new mongoose.Schema({
  slNo: { type: String, required: true },
  model: { type: String, required: true },
  mgmtIP: { type: String, required: true },
  kvmIP: { type: String, required: true },
  owner: { type: String },
  rackDetails: { type: String, required: true },
  reserveTill: { type: Date },
  comments: { type: String },
  status: { type: String, enum: ['free', 'occupied'] } // Add status field
});

module.exports = mongoose.model('SystemDetail', systemDetailSchema);
