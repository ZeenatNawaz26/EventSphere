const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true }
});

// Hash password before saving to database
UserSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
    