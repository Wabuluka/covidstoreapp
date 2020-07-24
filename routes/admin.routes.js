const express = require('express');
// const pass = require('../middleware/bcrypt');
const bcrypt = require('bcryptjs')
const passport = require('passport')





const router = express.Router();

// Admin Model
const AdminModel = require('../models/admin.model');
// Product Model
const productModel = require('../models/product.model');
// Manager Model
const managerModel = require('../models/manager.model');

// default route that all clients access the app land on
router.get('/', (req, res) =>{
    res.render('admin/index')
})

// get the admin signup url
router.get('/signup', (req, res) =>{
    res.render('admin/admin-signup')
})
// (post) the admin signup url processing
router.post('/signup', (req, res)=>{

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
    const email = req.body.email
    const gender = req.body.gender
    const country = req.body.country
    const city = req.body.city
    const password = req.body.password



    const admin = new AdminModel({
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        gender: gender,
        country: country,
        city: city,
        password: password
    })
    bcrypt.genSalt(10,  (err, salt)=>{
        bcrypt.hash(admin.password, salt, (err, hash)=>{
            if(err){
                console.log(err);
            }
            admin.password = hash
            try{
                 admin.save((error, result) => {
                    if(error){
                        console.log(error);
                    }
                    res.redirect('/admin/login');
                })
            }catch(error){
                console.log(error);
            }
        })
    })
    
    
})

// get the admin login url
router.get('/login', (req, res) =>{
    res.render('admin/admin-login')
});

// (post) the admin signup url processing
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/admin/login',
    })(req, res, next);
});


// get route for creating manager
router.get('/create', (req, res)=>{
    res.render('admin/create-manager');
})
// post method for creating a manager
router.post('/create', async (req, res) => {
    // const manager =  new Manager(req.body);
    const managerid = await managerModel.countDocuments({}) + 1
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const nin = req.body.nin
    const email = req.body.email
    const password = req.body.password

    const hashedPassword = pass.hashPassword(password)
    
    const manager = new managerModel({
        managerid: managerid,
        firstname: firstname,
        lastname: lastname,
        nin: nin,
        email: email,
        password: hashedPassword
    })

    await manager.save((error, result)=>{
        try{
            if(error){
                console.log(error)
            }else{
                console.log(manager)
                res.redirect('/admin')
            }
        }catch(error){
            console.log(error)
        }
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
 
module.exports = router;
