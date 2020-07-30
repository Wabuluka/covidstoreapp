const expess = require('express');
const router = expess.Router();
const productModel = require('../models/product.model');

// image uploader
const upload =  require('../middleware/uploader');


// get the add product page
router.get('/add-product', ensureAuthenticated,  (req, res)=>{
    res.render('admin/add-product')
})

// post method for adding product to database
router.post('/add-product', ensureAuthenticated, upload.single('productimage') ,async (req, res)=>{

    // Get user logged in
    const user = req.user


    const productid = await productModel.countDocuments({}) + 1
    const productname = req.body.productname
    const productimage = req.file.filename
    const category = req.body.category
    const productdescription = req.body.description
    const productcost = req.body.productcost
    const createdby = user._id

    const product = new productModel({
        productid: productid,
        productname: productname,
        productimage: productimage,
        category: category,
        productdescription: productdescription,
        productcost: productcost,
        createdby: createdby
    })
    try{
        await product.save((error, result) =>{
            if(error){
                console.log(error);
            }
            res.redirect('/admin');
        })
    }catch(error){
        console.log(error);
    }
})

 
// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/admin/login');
    }
}
  

module.exports = router;