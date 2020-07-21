const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    productid: String,
    productname: {
        type: String
    },
    productimage: String,
    productdescription: String,
    category: String,
    productcost: {
        type: String,
    }
})
// Shifa Arinaitwe

const Product = module.exports = mongoose.model('Product', ProductSchema);