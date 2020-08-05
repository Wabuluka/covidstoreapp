const express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport')
const isAdmin =  require('../middleware/roles').isAdmin
const ensureAuthenticated =  require('../middleware/roles').ensureAuthenticated
const router = express.Router();

// Product Model
const productModel = require('../models/product.model');
const User = require('../models/admin.model');
const flash = require('express-flash');

const helperClass = require('../middleware/helper');

// default route that all clients access the app land on
router.get('/', isAdmin, (req, res) =>{
    res.render('admin/index')
})

// get the admin signup url
router.get('/signup', (req, res) =>{
    res.render('admin/admin-signup')
})
// (post) the admin signup url processing
router.post('/signup', async (req, res)=>{

    const userid = await User.countDocuments({}) + 1
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const nin = req.body.nin
    const role = `admin`
    const gender = req.body.gender
    const country = req.body.country
    const city = req.body.city
    const password = req.body.password

    // check if user already exists
    if(User.findOne(username)){
        req.flash('Username already taken');
        res.redirect('/admin/signup')
    }
    try{
        let user = new User({
            userid: userid,
            firstname: firstname,
            lastname: lastname,
            username: username,
            email: email,
            nin: nin,
            role: role,
            gender: gender,
            country: country,
            city: city,
            password: password
        })
    
        bcrypt.genSalt(10, function(err, salt){
            bcrypt.hash(user.password, salt, function(err, hash){
                if(err){
                    console.log(err)
                }
                user.password = hash;
                user.save(function(err){
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        res.redirect('/admin/login');
                    }
                })
            })
        })
    }catch(error){
        console.log(error)
    }
    
    
})

// get the admin login url
router.get('/login', (req, res) =>{
    res.render('admin/admin-login')
});
// (post) the admin signup url processing
router.post('/login', function(req, res, next){
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login'
    })(req, res, next)
})

// route to logout
router.get('/logout', (req, res)=>{
    req.logout();
    req.flash('success', 'You are logged out')
    res.redirect('/admin/login')
})

// Manager Registration
router.get('/manager/create', ensureAuthenticated,  (req, res)=>{
    res.render('admin/create-manager')
})

// Manager Registration Post Route
router.post('/manager/create', ensureAuthenticated, async (req, res)=>{

    // Get user logged in
    // let loggedUser = req.user
    const userid = await User.countDocuments({}) + 1
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const nin = req.body.nin
    const role = `manager`
    const gender = req.body.gender
    const country = req.body.country
    const city = req.body.city
    const password = req.body.password
    // const createdby = loggedUser._id
    
    // check for availability of the user


    let user = new User({
        userid: userid,
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        nin: nin,
        role: role,
        gender: gender,
        country: country,
        city: city,
        password: password,
        // createdby: createdby
    })

    bcrypt.genSalt(10, function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if(err){
                console.log(err)
            }
            user.password = hash;
            user.save(function(err){
                if(err){
                    console.log(err);
                }else{
                    res.render('/admin');
                }
            })
        })
    })
})



// get all products
router.get('/products', ensureAuthenticated, (req, res) => {
    // res.render('admin/products')
    productModel.find({}, (error, result)=>{
        if(error){
            res.send(error)
        }else{
            res.render('admin/products', {title: 'All Products', products: result})
        }
    })
})

// get route for editing a product
router.get('/products/edit/:id',ensureAuthenticated, (req, res)=>{
    productModel.findById(req.params.id, (err, product)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin/edit_product', {singleProduct: product})
        }
    })
})

// post route for editing the product details
router.post('/products/edit/:id', ensureAuthenticated, (req, res)=>{
    const initialpay = helperClass.intialPayCalulcator(req.body.productcost)
    productModel.updateOne( { _id: req.params.id },         {
        $set: {
            productname :req.body.productname,
            description :req.body.description,
            make: req.body.make,
            color: req.body.color,
            numberinstock: req.body.instock,
            category :req.body.category,
            productcost :req.body.productcost,
            initialpay
        }
    }, (err, updatedProduct)=>{
        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/products')
        }
    })
})

// agent dashboard url
router.get('/agent', ensureAuthenticated, (req, res)=>{
    res.render('./manager/index')
})
 
module.exports = router;
