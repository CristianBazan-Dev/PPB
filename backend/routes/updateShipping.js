const router = require('express').Router() 

const productCntrlr = require('../controllers/productCntrlr');

const authAdmin = require("../middleware/authAdmin"); 

router.route('/shipping')
            .post(productCntrlr.getShippingsByZone)

module.exports = router; 