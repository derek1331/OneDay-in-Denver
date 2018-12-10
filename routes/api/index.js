const router = require("express").Router();
const eventRoutes = require("./events");
const userRoutes = require("./users");
const loginRoutes = require("./login");
const favoriteRoutes = require("./favorites");
const deleteRoutes = require("./delete");
const itineraryRoutes = require("./itinerary")
const mapRoutes = require("./maps")

router.use("/events", eventRoutes);
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/favorites", favoriteRoutes)
router.use("/delete", deleteRoutes)
router.use("/itinerary", itineraryRoutes)
router.use("/maps", mapRoutes)

module.exports = router;