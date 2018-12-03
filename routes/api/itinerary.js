const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/events"
router.route('/')
    .put(usersController.updateItinerary)

router.route('/delete')
    .put(usersController.removeItinerary)

module.exports = router;


