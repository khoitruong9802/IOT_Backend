import mongoose from "mongoose";

const schema = new mongoose.Schema({
  status: {
    type: Number,
    required: true
  },
  device: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Device", 
    required: true 
  }
}, {
  timestamps: true
});
export const Device = mongoose.model("Device", schema);
