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

// router.post(
//     '/login',
//     function (req, res, next) {
//         console.log('routes/user.js, login, req.body: ');
//         console.log(req.body)
//         next()
//     },
//     passport.authenticate('local'),
//     (req, res) => {
//         console.log('logged in', req.user);
//         var userInfo = {
//             username: req.user.username
//         };
//         res.send(userInfo);
//     }
// )


module.exports = router;