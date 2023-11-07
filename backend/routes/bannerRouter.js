const router = require('express').Router() 

const bannerCntrlr = require('../controllers/bannerCntrlr');
const { getBanners } = require('../controllers/bannerCntrlr'); 

const authAdmin = require("../middleware/authAdmin"); 

router.route('/banners')
            .get(bannerCntrlr.getBanners)
            .post(bannerCntrlr.createBanner)

router.route('/banners/:id')
             .put(bannerCntrlr.updateBanner)


module.exports = router; 