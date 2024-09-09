const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
       name : {
        type: String,
        required: true,
       },
       email : {
        type: String,
        required: true,
        unique: true,
       },
       image:{
        type: String,
        required:false,
       },
       password: {
          type: String,
          required: false,
       },
       role : {
        type : String,
        default:'user' 
       }
})

const User = mongoose.model('User', userSchema);

module.exports = User;