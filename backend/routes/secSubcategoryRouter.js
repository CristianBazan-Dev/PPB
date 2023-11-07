const router = require("express").Router();

const secSubcategoryCntrlr = require("../controllers/secSubcategoryCntrlr");

router
  .route("/secsubcategory/")
  .get(secSubcategoryCntrlr.getSecSubcategories)
  .post(secSubcategoryCntrlr.createSecSubcategory);

router
  .route("/secsubcategory/:id")
  .get(secSubcategoryCntrlr.getSecSubcategory)
  .patch(secSubcategoryCntrlr.updateSecSubcategory)
  .delete(secSubcategoryCntrlr.deleteSecSubcategory);

module.exports = router;
