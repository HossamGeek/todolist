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
          { $push: { [field] : updates }},
          opt
        );
    },
    findinlist:(where,filter={})=>{
        return Todo.find(where,{ list: 
            { $elemMatch : 
                filter
            } 
        })
    },
    updateInList(filter, updates={}, opt = {}) {
        return Todo.updateOne({  list: 
            { $elemMatch : 
                filter
            } 
        }, { $set: updates }, opt);
      }


}
