const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

//Matches with "/api/events"
router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.findAll);


module.exports = router;