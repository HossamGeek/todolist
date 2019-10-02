const Yup  = require('yup');
const lsitSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
});
let resErr = (err)=>({data:err.name,err:err.errors[0],success:false}); 
let idIsNotFound = (key) => ({err:key + " is required in headers",success:false});
module.exports = {
    userIdIsFound : (req,res,next)=>{
        let {user_id} = req.headers; 
        if(!user_id)return res.json(idIsNotFound("user_id"));
        next();
    },
    listIdIsFound : (req,res,next)=>{
        let {list_id} = req.headers; 
        if(!list_id)return res.json(idIsNotFound("list_id"));
        next();
     },
    listIsFound : (req,res,next) =>{
        lsitSchema.validate( req.body).then(result => {
            req.body = (result);
            next();
        }).catch(err=>res.json(resErr(err)))
    }
};