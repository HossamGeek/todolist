const userService = require('../services/user.service');
const bcrypt = require ('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const hashPassword = password => bcrypt.hashSync(password, salt);
const passwordCompare = (password,hash) => bcrypt.compareSync(password, hash); 
const emailIsFound = (email)=>userService.findUser({email});
const userDataResponse = (data)=>({
    email:data.email,
    f_name:data.f_name,
    l_name:data.l_name,
    _id:data._id,
    phone:data.phone,
})

module.exports = {
    register : (req,res)=>{
        req.body.password = hashPassword(req.body.password);
        userService.createUser(req.body)
       .then(data=>res.json({data,success:true}))
       .catch(err=>res.json({err,success:false}));
    },
    login: (req,res)=>{
        let {email,password} = req.body;
        emailIsFound(email).then(data=>{
            data.length 
            ?   (passwordCompare(password,data[0].password) 
                    ?   res.json({data:userDataResponse(data[0]),success:true})
                    :   res.json({err:"password not correct",success:false})) 
            :   res.json({err:'email not found',success:false})
            
        })
    }

};