const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "plz enter an email"],
    unique: true,

    // valiodation: [(val)=>{}, "plz enter valid email"]
  },
  password: {
    type: String,
    required: [true, "plz enter a password"],
    minlength: [8, "minmum length is 8 chars"],
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this)
  next();
});
const User = mongoose.model("user", userSchema);

module.exports = User;
