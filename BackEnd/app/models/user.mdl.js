const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const user = new Schema({
    _id             :   { type: Schema.ObjectId, auto: true },
    f_name          :   String,
    l_name          :   String,
    password        :   String,
    email           :   {type:String,unique:true},
    phone           :   String,
    sign_in_date    :   { type: Date, default: Date.now }
},{collection:"user"});

const userModel =mongoose.model("user",user);
module.exports = userModel;
