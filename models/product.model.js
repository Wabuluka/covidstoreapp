const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    productname: {
        type: String
    },
    productimage: String,
    category: String,
    productcost: {
        type: String,
    }
})
// Shifa Arinaitwe

const Product = module.exports = mongoose.model('Product', ProductSchema);