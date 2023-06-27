const ErrorHandler = require("../utils/error-handler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user-model");
const sendToken = require("../utils/jwt-token");
const sendEmail = require("../utils/send-email");
const crypto = require("crypto");

//Register a user

exports.registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "This is a sample id ",
      url: "profilePickUrl",
    },
  });

  sendToken(user, 201, res);
});

//Login User

exports.loginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  //check if email and password is entered by user

  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  //finding user in database

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401)); //401 is
  }

  const isPasswordMatched = await user.comparePassword(password);
  //if user not prsent
  //check if password is correct or not

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401)); //401 is
  }

  sendToken(user, 200, res);
});

// Logout user

exports.logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successFully",
  });
});

//Forgot Password

exports.forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  //Get Reset Password Token

  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPassWordUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/password/rest/${resetToken}`;

  // console.log(resetPassWordUrl)

  const message = `You password reset token is:- \n\n ${resetPassWordUrl} \n\n If you have not requested this email then, please ignore it `;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email} sucessfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

//resetpassword
exports.resetPassword = catchAsyncError(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password Token is Invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match", 400));
  }

  user.password = req.body.password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;

  await user.save();

  sendToken(user, 200, res);
});

//Get useer details

exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//Update Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  //check if password is correct or not

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Old Password is incorrect ", 401)); //401 is
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("Password doesn't match"), 400);
  }
  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

//update user Profile

exports.updateProfile = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };
  //we will add cloudinary later

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//get all users  (Admin)

exports.getAllUser = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    users,
  });
});

//GET SINGLE USER (admiN)
//Da (detailed by admin)
exports.getUserDA = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`userr doesn't exist with id: ${req.params.id} `)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

//update user role  -- ADMIN

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  res.status(200).json({
    success: true,
  });
});

//delete user (admin)

exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(
      new ErrorHandler(`userr doesn't exist with id: ${req.params.id} `)
    );
  }

  //remove avatar from cloudinary

  await user.deleteOne();

  res.status(200).json({
    success: true,
    message: "User deleted successfully",
  });
});
