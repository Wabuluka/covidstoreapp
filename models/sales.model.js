const mongoose = require('mongoose')

// Sales Schema
const SalesSchema = mongoose.Schema({
    productId: String,
    amountpaid: Number,
    customername: String,
    customeremail: String,
    dateoftransaction: Date,
    status: String,
    agent: String
})
module.exports = mongoose.model('Sales', SalesSchema)