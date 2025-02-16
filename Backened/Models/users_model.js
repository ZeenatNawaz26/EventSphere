const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true } // ✅ This will store hashed password
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
