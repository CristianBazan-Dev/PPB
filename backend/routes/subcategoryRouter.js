const router = require("express").Router();

const subcategoryCntrlr = require("../controllers/subcategoryCntrlr");

const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.route("/subcategory/category")
      .post(subcategoryCntrlr.getCategory)

router
  .route("/subcategory")
  .get(subcategoryCntrlr.getSubcategories)
  .post(auth, authAdmin, subcategoryCntrlr.createSubcategory);

router
  .route("/subcategory/:id")
  .get(subcategoryCntrlr.searchSubcategory)  
  // It has auth and auth admin but i deleted it temporaly to have access to tuvieja 
  .delete(auth, authAdmin, subcategoryCntrlr.deleteSubcategory)
  .put(auth, authAdmin, subcategoryCntrlr.updateSubcategory);


router 
  .route("/subcategory/:id/deleteAll")
  .delete(auth, authAdmin, subcategoryCntrlr.deleteAllSubcategories)
module.exports = router;
