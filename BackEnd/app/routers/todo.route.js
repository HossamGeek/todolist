const todoRouter = require('express').Router();
const todoMiddleWare = require('../middlewares/todo.midr');
const todoController = require('../controllers/todo.ctrl');

todoRouter.route('')
.post(todoMiddleWare.userIdIsFound,todoMiddleWare.listIsFound,todoController.push)
.get(todoMiddleWare.userIdIsFound,todoController.getAllToDoListByUser)
.delete(todoMiddleWare.listIdIsFound,todoController.deleteToDo)
.put(todoMiddleWare.listIdIsFound,todoMiddleWare.listIsFound,todoController.updateToDo)

module.exports = todoRouter;