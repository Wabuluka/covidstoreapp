const bcrypt = require('bcrypt');

const Passworder = {

    // Hashing a password
    hashPassword(password){
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    },
    
    // Decoding the password
    comparePassword(hashPassword, password){
        return bcrypt.compareSync(password, hashPassword);
    },
}



module.exports = Passworder