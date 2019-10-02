const User = require('../models/user.mdl');
const mongoose = require('mongoose');
module.exports = {
    createUser : (userData) => {
        let newUser = new User(userData);
        return newUser.save();
    },
    findUser :(where)=>{
        return User.find(where);
    }


}
