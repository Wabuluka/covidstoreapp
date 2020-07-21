const express = require('express');

const router = express.Router();


const AdminModel = require('../models/admin.model');

// default route that all clients access the app land on
router.get('/', (req, res) =>{
    res.render('admin/index')
})

// get the admin signup url
router.get('/signup', (req, res) =>{
    res.render('admin/admin-signup')
})
// (post) the admin signup url processing
router.post('/signup', async(req, res)=>{

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
    try{
        await admin.save((error, result) => {
            if(error){
                console.log(error);
            }
            res.redirect('/admin/login');
        })
    }catch(error){
        console.log(error);
    }
    
})

// get the admin login url
router.get('/login', (req, res) =>{
    res.render('admin/admin-login')
});

// (post) the admin signup url processing
router.post('/login', (req, res) => {
    const query = req.body.email
    AdminModel.findOne(query, (error, result) => {
        if(error){
            console.log(error)
        }else{
            res.redirect('/admin')
        }
    })
})


// get route for creating manager
router.get('/create', (req, res)=>{
    res.render('admin/create-manager');
})

router.post('/create', async (req, res) => {
    const manager =  new Manager(req.body);

    await manager.save((error, result)=>{
        try{
            if(error){
                console.log(error)
            }else{
                console.log(manager)
                res.redirect('admin')
            }
        }catch(error){

        }
    })    
})


// get all products
router.get('/products', (req, res) => {
    res.render('admin/products')
})
 

module.exports = router;
