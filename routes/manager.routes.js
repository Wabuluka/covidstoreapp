const express = require('express')
const router = express.Router();


const Manager = require('../models/manager.model');
const { render } = require('pug');

router.get('/login', (req, res)=>{
    res.render('manager/login')
})

router.post('/login', async (req, res) => {
    
})

module.exports = router