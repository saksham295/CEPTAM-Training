const mongoose = require("mongoose");

const CenterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  city: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Workcenter", "Institute", "Both", "Other"],
    required: true,
  },
  subtype: {
    type: String,
    enum: ["Inhouse", "Outsourced", "N/A"],
    required: function () {
      return this.type === "Institute";
    },
  },
});

module.exports = Center = mongoose.model("center", CenterSchema);
