const router=require("express").Router();
const User = require("../models/user");
const bcrypt=require("bcryptjs");
const JWT = require("jsonwebtoken");

const {validateRegister, validateLogin}= require("../validation");

router.post('/register', async(req, res)=>{
     const {error} = validateRegister(req.body)
if(error){
     return res.status(400).send(error.details[0].message);
}

const emailExist=await User.findOne({email:req.body.email});
if(emailExist)
return res.status(400).send("Email already exist");
    const salt = await bcrypt.genSalt(10);
     const hash= await bcrypt.hash(req.body.password, salt);
    
     // const error=validSchema.validate(req.body) 
     // res.send(error.error.details[0].message)
     const user= new User({
          name:req.body.name,
          email:req.body.email,
          password:hash
     });
     try{
const savedUser =await user.save();
res.status(200).send({user:savedUser})
     }catch(error){
          res.status(400).send({status:"Failed",msg:error})
     }
})
 router.post('/login', async(req,res)=>{
     // res.status(200).send('Login')
     const {error}= validateLogin(req.data)
     if(error)
     return res.status(400).send(error.details[0].message)

     const userExist=await User.findOne({email:req.body.email});
     if(!userExist)
     return res.status(400).send("Invalid Email");
     
     const validPass= await bcrypt.compare(req.body.password, userExist.password)
     if(!validPass)
     return res.status(200).send("Invalid Password")

     const token= JWT.sign({_id:userExist._id}, process.env.TOKEN_SECRET)
     res.header('auth-token', token).send(token)
})
router.get('/', async(req, res)=>{
     res.send(req.body)
})
module.exports=router
