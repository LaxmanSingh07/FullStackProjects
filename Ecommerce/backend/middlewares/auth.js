const catchAsyncErrors = require("./catchAsyncError");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/error-handler");
const User = require("../models/user-model");

exports.isAuthenicatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  console.log(token);
  if (!token) {
    return next(new ErrorHandler("Login first to access this resource", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET); // it will decode the token and give us the id of the user
  req.user = await User.findById(decoded.id); // find the user with the id in the database
  // we can access the user in the next middleware
  next();
});

exports.authRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
    return next(  new ErrorHandler(
        `Role ${req.user.role} is not allowed to access this resource`,403 // 403 is used 
      ))
    }

    next();
  };
};
