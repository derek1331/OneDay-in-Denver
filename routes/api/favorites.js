const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models")
const usersController = require("../../controllers/usersController");


router.route('/')
    .put(usersController.findOne)

module.exports = router;