const express = require('express');
const userController = require('../controllers/user.controller');
const authenticateUser= require("../middlewares/authenticate")
const router = express.Router();

router.post('/create-subuser', authenticateUser(["user", "Expert"]), userController.createSubUser);

module.exports = router;
