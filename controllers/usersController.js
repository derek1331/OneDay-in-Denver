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
    removeItinerary: function (req, res) {
        db.Users.update({
                username: req.body.username
            }, {
                $pull: {
                    itinerary: {
                        id: {
                            $in: [req.body.id]
                        }
                    }
                }
            })

            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));



    },
    removeMaps: function (req, res) {
        db.Users.update({
                username: req.body.username
            }, {
                $pull: {
                    map: {
                        id: {
                            $in: [req.body.id]
                        }
                    }
                }
            })

            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));



    },
    updateOne: function (req, res) {
        function randomColor(brightness){
            function randomChannel(brightness){
              var r = 255-brightness;
              var n = 0|((Math.random() * r) + brightness);
              var s = n.toString(16);
              return (s.length==1) ? '0'+s : s;
            }
            return '#' + randomChannel(brightness) + randomChannel(brightness) + randomChannel(brightness);
          }        db.Users
            .update({
                username: req.body.username
            }, {
                $addToSet: {
                    favorites: {
                        name: req.body.name,
                        start: req.body.start,
                        lat: req.body.lat,
                        long: req.body.long,
                        time: req.body.time,
                        kind: req.body.kind,
                        id: req.body.id,
                        color: randomColor(20)
                        

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
    },

    updateItinerary: function (req, res) {
        db.Users
            .update({
                username: req.body.username
            }, {
                $addToSet: {
                    itinerary: {

                        id: req.body.id,
                        title: req.body.title,
                        start: req.body.start

            

                    
                },

            }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
    updateMaps: function (req, res) {
        db.Users
            .update({
                username: req.body.username
            }, {
                $addToSet: {
                    map: {

                        name: req.body.name,
                        lat: req.body.lat,
                        lng: req.body.lng,
                        id: req.body.id

            

                    
                },

            }})
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    },
}