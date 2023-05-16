const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/proudct_controller");
const { isAuthenicatedUser, authRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router
  .route("/admin/product/new")
  .post(isAuthenicatedUser, authRoles("admin"), createProduct);
router
  .route("/admin/product/:id")
  .put(isAuthenicatedUser, authRoles("admin"), updateProduct)
  .delete(isAuthenicatedUser, authRoles("admin"), deleteProduct);

router.route("/products/:id").get(getProductDetails);
router.route("/review").put(isAuthenicatedUser, createProductReview);
router.route("/reviews").get(getProductReviews).delete(isAuthenicatedUser,deleteReview)
module.exports = router;
