const router = require('express').Router();

const mailCntrlr = require('../controllers/mailCntrlr'); 


router.route('/sendmail')
        .post(mailCntrlr.sendmail); 


module.exports = router; 

