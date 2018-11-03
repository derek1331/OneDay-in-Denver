const express = require("express");

const mongoose = require("mongoose");
const routes = require("./routes");
const session = require("express-session");
const passport = require("./config/passport");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser');


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// Enable express to parse body data from raw application/json data
app.use(bodyParser.json());

// Enables express to parse body data from x-www-form-encoded data
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    if (req.method === "OPTIONS") {
        return res.status(200).end();
    }

    // Pass to next layer of middleware
    next();
});

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(session({
    secret: "anything",
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB
mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/onedayindenver"
);


app.listen(PORT, function () {
    console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});