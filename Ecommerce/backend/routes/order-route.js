const express = require("express");
const { isAuthenicatedUser, authRoles } = require("../middlewares/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/order-controller");
const router = express.Router();

router.route("/order/new").post(isAuthenicatedUser, newOrder);
router.route("/order/:id").get(isAuthenicatedUser, getSingleOrder);
router.route("/orders/me").get(isAuthenicatedUser, myOrders);
router
  .route("/admin/orders")
  .get(isAuthenicatedUser, authRoles("admin"), getAllOrders);
router
  .route("/admin/order/:id")
  .put(isAuthenicatedUser, authRoles("admin"), updateOrder)
  .delete(isAuthenicatedUser, authRoles("admin"), deleteOrder);
module.exports = router;
