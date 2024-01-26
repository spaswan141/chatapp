const express = require('express');
const Auth = require('./auth.route');
const User=require('./user.route');

const router = express.Router();

router.use('/auth',Auth);
router.use("/user",User)
module.exports = router;
