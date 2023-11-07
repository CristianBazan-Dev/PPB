const router = require("express").Router();

const productCntrlr = require("../controllers/productCntrlr");
const { getProducts } = require("../controllers/productCntrlr");

const authAdmin = require("../middleware/authAdmin");

router
  .route("/products")
  .get(productCntrlr.getProducts)
  .post(productCntrlr.createProduct);

router.route("/products/detail/:id").get(productCntrlr.getProduct);

router
  .route("/products/:id")
  .delete(productCntrlr.deleteProduct)
  .put(productCntrlr.updateProduct);

router
  .route("/products/shipping")
  .get(productCntrlr.getShipping)
  .post(productCntrlr.createShipping);

router
  .route("/products/shipping/:id")
  .delete(productCntrlr.deleteShipping)
  .put(productCntrlr.updateShipping);

router.route("/products/offer").get(productCntrlr.gettingOfferProducts);

router.route("/products/updatePrices").patch(productCntrlr.updatePrices);

module.exports = router;
