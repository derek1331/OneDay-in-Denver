const db = require("../models");

module.exports = {
    findAll: function (req, res) {
        db.Users
            .find(req.query)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Users
            .create(req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    remove: function (req, res) {
        db.Users.update({
                username: req.body.username
            }, {
                $pull: {
                    favorites: {
                        name: {
                            $in: [req.body.name]
                        }
                    }
                }
            })

            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));



    },
    updateOne: function (req, res) {
        db.Users
            .update({
                username: req.body.username
            }, {
                $addToSet: {
                    favorites: {
                        name: req.body.name,
                        start: req.body.start,
                        lat: req.body.lat,
                        long: req.body.long,
                        time: req.body.time
                        

                    }
                },

            })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },

    findOne: function (req, res) {
        db.Users
            .findOne({
                username: req.body.username
            }).then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }
}