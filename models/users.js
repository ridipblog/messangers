const mongoose = require("mongoose");
let userSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    user_name: String,
    uniqe_name: String,
    pass: String,
  },
  { collection: "users" }
);
module.exports = mongoose.model("users", userSchema);
