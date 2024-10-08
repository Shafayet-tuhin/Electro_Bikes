const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    item_id:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }

})

module.exports = mongoose.model('Favorite', favoriteSchema);