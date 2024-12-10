const router = require('express').Router();
const User = require('../controllers/user.controller');
const adminOnly = require("../middlewares/admin.middleware");
const user = new User();

// routes
router.post('/login', user.login);
router.post('/sign', user.userLogin);
router.get('/', user.getUser);
router.put('/update', user.updateName);
router.post('/changePassword', adminOnly, user.changePassword);


module.exports = router;