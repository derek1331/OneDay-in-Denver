const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/events"
router.route("/")
.put(usersController.remove)


module.exports = router;