const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    productid: String,
    productname: {
        type: String
    },
    productimage:[
        {
            type: String
        }
    ],
    productdescription: String,
    category: String,
    productcost: {
        type: String,
    },
    createdby: String
})
// Shifa Arinaitwe

const Product = module.exports = mongoose.model('Product', ProductSchema);