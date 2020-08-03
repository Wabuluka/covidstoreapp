const flash = require("express-flash");

module.exports.ensureAuthenticated = (req, res, next)=>{
    if(req.isAuthenticated()){
      return next();
    } else {
      req.flash('danger', 'Please login');
      res.redirect('/admin/login');
    }
}

module.exports.isAdmin = (req, res, next) => {
    if (req.isAuthenticated() && req.user.role == 'admin') {
        next();
    } else if (req.isAuthenticated() && req.user.role == 'manager'){
        res.redirect('/admin/agent')
    }else{
      res.redirect('/admin/login', 401)
    }
}