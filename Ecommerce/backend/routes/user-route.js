const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getUserDA,
  updateUserRole,
  deleteUser,
} = require("../controllers/user-controller");
const { isAuthenicatedUser, authRoles } = require("../middlewares/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/me").get(isAuthenicatedUser, getUserDetails);
router.route("/password/update").put(isAuthenicatedUser, updatePassword);
router.route("/me/update").put(isAuthenicatedUser, updateProfile);
router
  .route("/admin/users")
  .get(isAuthenicatedUser, authRoles("admin"), getAllUser);
router
  .route("/admin/user/:id")
  .get(isAuthenicatedUser, authRoles("admin"), getUserDA)
  .put(isAuthenicatedUser, authRoles("admin"), updateUserRole)// get single user details
  .delete(isAuthenicatedUser, authRoles("admin"), deleteUser); // update user role
  
  module.exports = router;
