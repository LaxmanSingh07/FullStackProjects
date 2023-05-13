const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} = require("../controllers/proudct_controller");
const { isAuthenicatedUser,authRoles } = require("../middlewares/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/product/new").post(isAuthenicatedUser,authRoles("admin"), createProduct);
router
  .route("/product/:id")
  .put(isAuthenicatedUser,authRoles("admin"), updateProduct)
  .delete(isAuthenicatedUser,authRoles("admin"), deleteProduct)
  .get(getProductDetails);

module.exports = router;
