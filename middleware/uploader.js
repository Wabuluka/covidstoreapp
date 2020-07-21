const multer = require('multer');
const path = require('path');

const storage =  multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
const upload = multer({
    storage: storage,
    limits: {fieldSize:  1000000},
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
})
// Check file type
function checkFileType(file, cb){
    // Allowed ext
    const fileTypes = /jpeg|jpg|png|gif/;
    // check extname
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    // check mime
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true);
    }else{
        cb('Error: Images Only')
    }
} 
module.exports = upload;