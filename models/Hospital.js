const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  initials: {
    type: String,
    default: "",
  },
});

// Middleware to save the initials of the name of a Hospital incase theres no image

hospitalSchema.pre("save", function (next) {
  if (this.isModified || this.isNew) {
    // Calculate intitla sfrom the hospiral name
    const name = this.name;
    const initials = name
      .split("")
      .map((word) => word.charAt(0))
      .join("");

    this.initials = initials.toUpperCase();
  }
  next();
});

const Hospital = mongoose.model("Hospital", hospitalSchema);

module.exports = Hospital;
