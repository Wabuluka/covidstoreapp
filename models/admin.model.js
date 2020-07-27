const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

// Admin Schema
const AdminSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    username: {
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    gender: String,
    country: String,
    city: String,
    password:{
        type: String,
        required: true,
    }
})

AdminSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('Admin', AdminSchema);
