const express = require('express');
const productModel = require('../models/product.model');




const router = express.Router();

// default route that all clients access the app land on
router.get('/', (req, res) =>{
    
    productModel.find({}, (error, results)=>{
        if(error){
            res.send(error)
        }else{
            // res.send(result)
            // res.send(result)
            res.render('index',{ products: results})
        }
    }).limit(3)
    
})

router.get('/about', (req, res) => {
    res.render('about')
})


 

module.exports = router;
