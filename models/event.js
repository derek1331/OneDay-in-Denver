const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    name: {type: String, required: true},
    category: String,
    rating: Number,
    time: String,
    drive: Number,
    address: {type: String, required: true},
    lat: {type: Number, required: true},
    long: {type: Number, required: true},
    attributes: Array,
    url: String,
    advice: String,
    img: String,
    description: {type: String, required: true},
    date: Date
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;