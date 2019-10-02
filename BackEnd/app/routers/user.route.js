const userRouter = require('express').Router();
const userMiddleWare = require('../middlewares/user.midr');
const userController = require('../controllers/user.ctrl');

userRouter.post('/register',userMiddleWare.registerValidation,userController.register);
userRouter.post('/login',userMiddleWare.loginValidation,userController.login);

module.exports = userRouter;