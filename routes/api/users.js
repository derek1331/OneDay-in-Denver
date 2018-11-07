const router = require("express").Router();
const passport = require("../../config/passport");
const db = require("../../models")
const usersController = require("../../controllers/usersController");



//Matches with "/api/events"
router.route('/')
    .post(usersController.create)


router.route("/")
    .get(usersController.findAll)

router.route("/")
    .put(usersController.updateOne)



module.exports = router;