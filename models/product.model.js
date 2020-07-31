const mongoose = require('mongoose');

// Product Schema
const ProductSchema = mongoose.Schema({
    productid: String,
    make: String,
    dateofentry: Date,
    serial: String,
    productname: {
        type: String
    },
    productimage:[
        {
            type: String
        }
    ],
    color: String,
    numberinstock: Number,
    productdescription: String,
    category: String,
    productcost: {
        type: Number,
    },
    initialpay: Number,
    createdby: String
})
// Shifa Arinaitwe

const Product = module.exports = mongoose.model('Product', ProductSchema);