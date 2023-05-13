const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // it is built in module
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your name"],
    maxLength: [30, "Name can't exceed 30 characters"],
    minLength: [5, "Name should have more than or equal to 5 characters"],
  },
  email: {
    type: String,
    required: [true, "Enter Enter your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter your password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false, // it will not show the password while searching
  },
  avatar: {
    // profile pics
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "user",
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

userSchema.pre("save", async function (next) {
  //whenever we save to the db then you have to modify the password with hash value
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 10); // 10 is the salt value
}); // before saving the mongodb then you have to use the

//JWT TOKEN

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

//compare password

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};


// Generating Password Reset Token


userSchema.methods.getResetPasswordToken = function () {
  //generating token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hashing and add to userSchema

  this.resetPasswordToken = crypto
    .createHash("sha256") // sha256 is the hasing technique 
    .update(resetToken)
    .digest("hex");

    this.resetPasswordExpire=Date.now() +15*60*1000; //15 minutes 

    return resetToken;
};

module.exports = mongoose.model("User", userSchema);
