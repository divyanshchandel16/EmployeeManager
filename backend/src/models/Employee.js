const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: /.+@.+\..+/, // simple email regex
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// Remove the duplicate index - unique: true in schema already creates the index
// employeeSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('Employee', employeeSchema);


