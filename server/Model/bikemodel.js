const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const bikeSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    details: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    specifications: {
        type: [String],
        required: true
    }
});


const Bike = mongoose.model('Bike', bikeSchema);

module.exports = Bike;
