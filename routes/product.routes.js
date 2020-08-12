const expess = require('express');
const router = expess.Router();
const productModel = require('../models/product.model');
const helperClass = require('../middleware/helper')
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
    const make = req.body.make
    const dateofentry = Date.now()
    const serial = req.body.serial
    const productimage = req.file.filename
    const category = req.body.category
    const color =  req.body.color
    const numberinstock = req.body.instock
    
    const productdescription = req.body.description
    const productcost = req.body.productcost
    const createdby = user._id

    // calculating the initial pay
    const initialpay = helperClass.intialPayCalulcator(productcost)

    const product = new productModel({
        productid: productid,
        productname: productname,
        make: make,
        serial: serial,
        dateofentry: dateofentry,
        productimage: productimage,
        category: category,
        color: color,
        numberinstock: numberinstock,
        productdescription: productdescription,
        productcost: productcost,
        initialpay: initialpay,
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