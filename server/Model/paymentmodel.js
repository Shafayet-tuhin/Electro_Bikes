const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentInfoSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    transactionId: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    orderStatus: {
        type: String,
        required: true
    },
    items:{
        type: [String]  // Array of item names
    },
    itemName:{
        type: [String]  // Array of item names
    },
    itemImage:{
        type: [String]  // Array of item images
    }
})

module.exports = mongoose.model('Payment', paymentInfoSchema);