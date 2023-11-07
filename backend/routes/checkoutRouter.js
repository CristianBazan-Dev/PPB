const router = require('express').Router(); 

const checkoutCntrlr = require('../controllers/checkoutCntrlr')

const auth = require('../middleware/auth');
const authAdmin = require("../middleware/authAdmin");

router.route('/checkout')
        .get(auth, authAdmin,   checkoutCntrlr.getCheckouts)
        .post(auth, checkoutCntrlr.createCheckoutInfo)

router.route('/checkout/:id')
        .post(auth, authAdmin, checkoutCntrlr.updateCheckout)

module.exports = router