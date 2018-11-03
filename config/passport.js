const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;


var db = require("../models");

passport.use(new LocalStrategy(

    {
        usernameField: "username"
    },
    function (username, password, done) {
        db.Users.findOne({username: username }, (err, user) => {
            if(err) {
                return done(err)
            }

            if(!user) {
                return done(null, false, {message: "incorrect username" })
            }

            else if (!user.checkPassword(password)) {
                return done(null, false, {
                    message: "Incorrect password."
                })
            }
            return done(null, user)
    })})
);


// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});

// Exporting our configured passport
module.exports = passport
