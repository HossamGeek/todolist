const Yup  = require('yup');

const userSchema = {
    email:Yup.string().email('email not valid').required('email is required'),
    f_name: Yup.string().matches(/[A-Za-z]/).min(3).max(30).required('f_name is required'),
    l_name: Yup.string().matches(/[A-Za-z]/).min(3).max(30).required('l_name is required'),
    phone:Yup.string(),
    password:Yup.string().required('password is required')
};
const registerSchema = Yup.object().shape(userSchema);
const loginSchema = Yup.object().shape({
    email:userSchema.email,
    password:userSchema.password
});
  
 const setDataToLowerCase = usrData => {
    let lowerData = new Set(['email','f_name','l_name' ])
    Object.keys(usrData).map(k=>{
         usrData[k] = lowerData.has(k) ? usrData[k].toLowerCase() : usrData[k];
    })
    return usrData;
};

let resErr = (err)=>({data:err.name,err:err.errors[0],success:false}); 

module.exports = {
    registerValidation : (req,res,next)=>{
        registerSchema.validate( req.body).then(result => {
            req.body = setDataToLowerCase(result);
            next();
        }).catch(err=>res.json(resErr(err)))
    },
    loginValidation : (req,res,next)=>{
        loginSchema.validate( req.body).then(result => {
            req.body = setDataToLowerCase(result);
             next();
        }).catch(err=>res.json(resErr(err)))
    },
};