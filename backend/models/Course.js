const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  center: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "center",
    required: true,
  },
  centerName: {
    type: String,
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  participants: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
  ],
  schedule: [
    {
      topic: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
        required: true,
      },
      faculty: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
      facultyName: {
        type: String,
        required: true,
      },
      file: [
        {
        name: {
          type: String,
          required: true,
        },
        location: {
          type: String,
          required: true,
        },
        },
      ],
    },
  ],
});

module.exports = Course = mongoose.model("course", CourseSchema);
