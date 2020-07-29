const express = require('express');
const bcrypt = require('bcryptjs')
const passport = require('passport')


const router = express.Router();

// Product Model
const productModel = require('../models/product.model');
// Manager Model
const managerModel = require('../models/manager.model');
const userModel = require('../models/admin.model');
const { route } = require('./index.routes');


// default route that all clients access the app land on
router.get('/', (req, res) =>{
    res.render('admin/index')
})

// get the admin signup url
router.get('/signup', (req, res) =>{
    res.render('admin/admin-signup')
})
// (post) the admin signup url processing
router.post('/signup', async (req, res)=>{

    const userid = await managerModel.countDocuments({}) + 1
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

    let user = new userModel({
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
    
})

// Manager Registration
router.get('/manager/create', (req, res)=>{
    res.render('admin/create-manager')
})

// Manager Registration Post Route
router.post('/manager/create', async (req, res)=>{

    // Get user logged in
    // let loggedUser = req.user
    const userid = await managerModel.countDocuments({}) + 1
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

    let user = new userModel({
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
                    return;
                }else{
                    res.redirect('/admin');
                }
            })
        })
    })
})



// get all products
router.get('/products', (req, res) => {
    // res.render('admin/products')
    productModel.find({}, (error, result)=>{
        if(error){
            res.send(error)
        }else{
            // res.send(result)
            res.render('admin/products', {title: 'All Products', products: result})
        }
    })
})

// get route for editing a product
router.get('/products/edit/:id',(req, res)=>{
    productModel.findById(req.params.id, (err, product)=>{
        if(err){
            console.log(err)
        }else{
            res.render('admin/edit_product', {singleProduct: product})
        }
    })
})

// post route for editing the product details
router.post('/products/edit/:id', async (req, res)=>{
    let product = {}
    product.productname = req.body.productname
    product.description = req.body.description
    product.category = req.body.category
    product.productcost = req.body.productcost

    let query = {_id: req.params.id}

    await productModel.findByIdAndUpdate(query, product, (err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/admin/products')
        }
    })
})
 
module.exports = router;
