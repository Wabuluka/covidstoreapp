const expess = require('express');
const router = expess.Router();
const productModel = require('../models/product.model');

// image uploader
const upload =  require('../middleware/uploader');


// get the add product page
router.get('/add-product', (req, res)=>{
    res.render('admin/add-product')
})

// post method for adding product to database
router.post('/add-product', upload.single('productimage') ,async (req, res)=>{
    const productname = req.body.productname
    const productimage = `/uploads/${req.file.filename}`
    const category = req.body.category
    const productcost = req.body.productcost

    const product = new productModel({
        productname: productname,
        productimage: productimage,
        category: category,
        productcost: productcost
    })
    try{
        await product.save((error, result) =>{
            if(error){
                console.log(error);
            }
            console.log(req.body)
            console.log(req.file.filename)
            res.redirect('/admin');
        })
    }catch(error){
        console.log(error);
    }
})

// single view url
router.get('/single-view', (req,res)=>{
    res.render('single-view')
})


module.exports = router;