const express = require('express');
const productModel = require('../models/product.model');




const router = express.Router();

// default route that all clients access the app land on
router.get('/', async(req, res) =>{
    
    await productModel.find({}, (error, results)=>{
        if(error){
            res.send(error)
        }else{
            // res.send(result)
            // res.send(result)
            res.render('index',{ products: results})
        }
    }).limit(4)
    
})

router.get('/about', (req, res) => {
    res.render('about')
})


 

module.exports = router;
