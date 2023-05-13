const ErrorHandler = require("../utils/error-handler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/user-model");
const sendToken = require("../utils/jwt-token");
const sendEmail=require("../utils/send-email")

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
  const isPasswordMatched = await user.comparePassword(password);

  //if user not prsent
  //check if password is correct or not

  if (!user || !isPasswordMatched) {
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

  const message=`You password reset token is:- \n\n ${resetPassWordUrl} \n\n If you have not requested this email then, please ignore it `;

  
  try{
    await sendEmail({
        email:user.email,
        subject:"Ecommerce Password Recovery",
        message
    });

    res.status(200).json({
        success:true,
        message:`Email send to ${user.email} sucessfully`
    })
  }
  catch(error)
  {
    user.resetPasswordToken=undefined;
    user.resetPasswordExpire=undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message,500));
  }


});