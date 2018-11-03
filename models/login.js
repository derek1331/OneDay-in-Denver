// const mongoose = require("mongoose");
// const Schema = mongoose.Schema;
// const bcrypt = require('bcryptjs');


// const userSchema = new Schema({
//     email: {type: String, required: true},
//     password: {type: String, required: true}
// });

// passport.use(new LocalStrategy({
//   usernameField: 'email',
//   passwordField: 'passwd',
//   session: false
// },
// function(username, password, done) {
//   Users.findOne({ username: username }, function (err, user) {
//     if (err) { return done(err); }
//     if (!user) { return done(null, false); }
//     if (!user.verifyPassword(password)) { return done(null, false); }
//     return done(null, user);
//   });
// }
// ));

// const Login = mongoose.model("User", userSchema);

// module.exports = Login;