const router = require("express").Router();
const usersController = require("../../controllers/usersController");



router.route('/')
    .post(usersController.create)


router.route("/")
    .get(usersController.findAll)

router.route("/")
    .put(usersController.updateOne)


module.exports = router;