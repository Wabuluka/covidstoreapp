const express = require('express');
const router = express.Router();

// default route that all clients access the app land on
router.get('/', (req, res) =>{
    res.render('index')
})

module.exports = router;
