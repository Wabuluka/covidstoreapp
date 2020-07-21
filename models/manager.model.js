const mongoose = require('mongoose');

const managerSchema = mongoose.Schema({
    managernin:{
        type: String
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
})

const Manager = module.exports  = mongoose.model('Manager', managerSchema);
