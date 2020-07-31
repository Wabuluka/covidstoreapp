const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash')
const session = require('express-session')
const morgan =  require('morgan');
const config = require('./config/database');
const passport = require('passport')
const User = require('./models/admin.model')
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

// set morgan
app.use(morgan('dev'));

app.use(flash())
app.use(session({
    secret: config.secret,
    resave: false,
    saveUninitialized: false
}))

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Passport Configuration
require('./middleware/authentication')(passport);
app.use(passport.initialize())
app.use(passport.session())

app.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

// routes
let indexRoutes = require('./routes/index.routes');
let adminRoutes = require('./routes/admin.routes');
let productRoutes = require('./routes/product.routes')
// let managerRoutes = require('./routes/manager.routes');

app.use('/', indexRoutes);
app.use('/admin', adminRoutes);
app.use('/products', productRoutes);


app.get('*', (req, res)=>{
    res.render('404')
})

app.listen(4040, () => console.log(`Sever started on port 4040`));