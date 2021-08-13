const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: { type: String, select: true },
  phone: String,
  role: {
    type: String,
    enum: [
      "SystemAdmin",
      "CenterAdmin",
      "InstAdmin",
      "CourseCoordinator",
      "Faculty",
      "User",
    ],
    required: true,
  },
  status: {
    type: String,
    enum: ["Active", "Inactive"],
    required: true,
    default: "Active",
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
  courses: [
    {
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
      },
      courseTitle: {
        type: String,
      },
      courseCenter: {
        type: String,
      },
      From: {
        type: Date,
      },
      To: {
        type: Date,
      },
    },
  ],
});

module.exports = User = mongoose.model("user", userSchema);
