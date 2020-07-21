const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


const config = require('./config/database');
// mongodb
mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
let mongoDb = mongoose.connection;

mongoDb.once('open', function(){
    console.log('DB connected')
})
mongoDb.on('error', function(err){
    console.log(err)
})

const app =express();
app.use(bodyParser.urlencoded({extended: true}))
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
// Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// routes
let indexRoutes = require('./routes/index.routes');
let adminRoutes = require('./routes/admin.routes');
let productRoutes = require('./routes/product.routes')
let managerRoutes = require('./routes/manager.routes');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);
app.use('/manager', managerRoutes);


app.get('*', (req, res)=>{
    res.render('404')
})

app.listen(4040, () => console.log(`Sever started on port 4040`));