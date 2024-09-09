const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
    email: {
        type: String,
        required: true
    }
},
    { timestamps: true })

module.exports = mongoose.model('Cart', cartSchema);