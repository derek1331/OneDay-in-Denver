const router = require("express").Router();
const eventsController = require("../../controllers/eventsController");

router.route("/")
    .get(eventsController.findAll)
    .post(eventsController.findAll);


module.exports = router;