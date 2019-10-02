const userRoute = require('./user.route');
const todoRoute = require('./todo.route');

const Router = app => {
    
    app.use('/user',userRoute);
    app.use('/todo',todoRoute);
    app.use('/',(req,res)=>{
        res.json({data:"Hello to do list app :)" ,success:true})
    })
}

module.exports = Router;