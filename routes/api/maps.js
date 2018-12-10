const router = require("express").Router();
const usersController = require("../../controllers/usersController");

//Matches with "/api/events"
router.route('/')
    .put(usersController.updateMaps)

router.route('/delete')
    .put(usersController.removeMaps)

module.exports = router;

