const router = require('express').Router();
const CreditController = require('../controllers/credit.controller');
const adminOnly = require("../middlewares/admin.middleware");
const credit = new CreditController();

// routes
router.post('/add', adminOnly, credit.addCreditPackage);
router.get('/all', credit.getAllCredits);
router.put('/update', adminOnly, credit.editCreditPackage);
router.delete('/delete', adminOnly, credit.deleteCreditPackage);
router.post('/buy', credit.buyCredits);


module.exports = router;