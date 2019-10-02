const todoService = require('../services/todo.service');
const mongoose = require('mongoose');
const id = (user_id)=>mongoose.Types.ObjectId(user_id);
const UserHaveToDoList = (user_id) => todoService.findTodo(user_id)
const createNemToDo = (data) => todoService.createTodo(data);
const pushInToDo = (user_id,list) => todoService.pushInList(user_id,'list',list)
const updateInList = (user_id,_id,data) => todoService.updateUserList (user_id,{_id},data);
module.exports = {
    push : (req,res)=>{
        let user_id = id(req.headers['user_id']);
        let {name} = req.body;
        let list = [{name}];
        UserHaveToDoList({user_id}).then(result=>{
            result.length
                ?  pushInToDo({user_id},list)
                    .then(data=>res.json({data,success:true}))
                    .catch(err=>res.json({err,success:false}))
                :  createNemToDo({user_id,list})
                    .then(data=>res.json({data,success:true}))
                    .catch(err=>res.json({err,success:false}))
        }).catch(err=>res.json({err,success:false}))
        
    },
    getAllToDoListByUser : (req,res)=>{
        let user_id = id(req.headers['user_id']);
        todoService.findUserlist(user_id,{action:false})
        .then(data=>res.json({data,success:true}))
        .catch(err=>res.json({err,success:false}))
    },
    deleteToDo : (req,res)=>{
        let user_id = id(req.headers['user_id']);
        let list_id = id(req.headers['list_id']);
        let action = {"list.$.action":true}
        updateInList(user_id,list_id,action)
        .then(data=>res.json({data,success:true}))
        .catch(err=>res.json({err,success:false}))
    },
    updateToDo : (req,res)=>{
        let user_id = id(req.headers['user_id']);
        let list_id = id(req.headers['list_id']);
        let name = {"list.$.name":req.body.name}
        updateInList(user_id,list_id,name)
        .then(data=>res.json({data,success:true}))
        .catch(err=>res.json({err,success:false}))
    },

};