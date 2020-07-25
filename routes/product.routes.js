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
    const productid = await productModel.countDocuments({}) + 1
    const productname = req.body.productname
    const productimage = req.file
    // const productimage = req.file
    const category = req.body.category
    const productdescription = req.body.description
    const productcost = req.body.productcost

    const product = new productModel({
        productid: productid,
        productname: productname,
        productimage: productimage,
        category: category,
        productdescription: productdescription,
        productcost: productcost
    })
    try{
        await product.save((error, result) =>{
            if(error){
                console.log(error);
            }
            console.log(result)
            res.redirect('/admin');
        })
    }catch(error){
        console.log(error);
    }
})

 


module.exports = router;