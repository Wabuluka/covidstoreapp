const mongoose = require('mongoose');
// const passportLocalMongoose = require('passport-local-mongoose');

// Admin Schema
const AdminSchema = mongoose.Schema({
    userid:String,
    firstname: String,
    lastname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    nin:String,
    role: String,
    gender: String,
    country: String,
    city: String,
    password:{
        type: String,
        required: true,
    }
})

// AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', AdminSchema);
