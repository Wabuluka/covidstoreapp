const express = require('express');
const productModel = require('../models/product.model');
const salesModel = require('../models/sales.model')
const helper = require('../middleware/helper')

const router = express.Router();

// default route that all clients access the app land on
router.get('/', async(req, res) =>{
    await productModel.find({}, (error, results)=>{
        if(error){
            res.send(error)
        }else{
            // req.flash('success', 'Please  welcome')
            res.render('index',{ products: results})
        }
    }).limit(4)
})

// view a single product
router.get('/product/:id', (req,res)=>{
    // res.render('single-view')
    productModel.findById(req.params.id, (err, product)=>{
        if(err){
            console.log(err)
        }
        if(product){
            let initialPay = helper.intialPayCalulcator(product.productcost)
            res.render('single-view', {singleProduct: product, initialPay})
        }
    })
})

// categories pager
router.get('/categories/:category', (req,res)=>{
    productModel.find({category : req.params.category}, (err, products)=>{
        if(err){
            console.log(err)
        }
        if(products == ''){
            res.render('404')
        }
        else{
            res.render('categories', {products: products})
        }
    })
})

// buying a product
router.get('/buy/:productId', (req, res)=>{
    productModel.findById(req.params.productId, (err, single)=>{
        if(err){
            console.log(err)
        }
        if(single){
            let initialPay = helper.intialPayCalulcator(single.productcost)
            res.render('sales', {oneProduct: single, initialPay})
        }
        
    })
    // res.render('sales')
})

// a customer requests to buy from here
router.post('/buy/:productId', async(req, res) =>{
    const productId = req.params.productId
    const customername = req.body.customername
    const email =  req.body.email
    const paidamount = req.body.paidamount
    const datebought = Date.now()
    const status = 'pending'

    const pay = new salesModel({
        productId: productId,
        amountpaid: paidamount,
        customername: customername,
        customeremail: email,
        dateoftransaction: datebought,
        status: status
    })
    try{
        await pay.save((err, paymentReq)=>{
            if(err){
                console.log(err)
            }
            res.render('success')
        })
    }catch(err){
        console.log(err)
    }
})
// successon buying request
router.get('/buy/success', (req, res)=>{
    res.render('success')
})

// about us page
router.get('/about', (req, res) => {
    res.render('about')
})

module.exports = router;
