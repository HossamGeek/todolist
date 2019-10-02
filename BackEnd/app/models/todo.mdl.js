const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const todo = new Schema({
    _id             :   { type: Schema.ObjectId, auto: true },
    list            :   [{
                            name            :   {type:String},
                            action          :   {type:Boolean,default:false},
                            creation_date   :   { type: Date, default: Date.now }
                         }],   
    user_id            :   {type: Schema.ObjectId,ref:"user",autopopulate: true},
    
},{collection:"todo"});

todo.plugin(require('mongoose-autopopulate'));
const todoModel =mongoose.model("todo",todo);
module.exports = todoModel;
