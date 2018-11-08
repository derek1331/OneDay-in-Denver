const router = require("express").Router();
const usersController = require("../../controllers/usersController");

router.route("/")
.put(usersController.remove)


module.exports = router;