const Todo = require('../models/todo.mdl');
module.exports = {
    createTodo : (todoData) => {
        let newTodo = new Todo(todoData);
        return newTodo.save();
    },
    findTodo :(where)=>{
        return Todo.find(where);
    },
    pushInList(where, field, updates, opt = {}) {
        return Todo.updateOne(
          where,
          { $push: { [field] : { $each:updates} }},
          opt
        );
    },
    findUserlist:(user_id,filter={})=>{
         return Todo.find({user_id,
            'list': {$elemMatch:filter}}
            
        )
         //.select(  { list: { $elemMatch: {action:true} } })
    },
    updateUserList(user_id,filter, updates={}, opt = {}) {
        return Todo.updateOne({  
            user_id,
            list: 
            { $elemMatch : 
                filter
            } 
        }, { $set: updates }, opt);
      }


}
