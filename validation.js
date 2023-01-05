const Joi = require("@hapi/joi");
const validateRegister=(data)=>{
     const validSchema= Joi.object({
          name:Joi.string().min(6).required(),
          email:Joi.string().min(6).required().email(),
          password:Joi.string().min(6).required(),
     
     })
     return validSchema.validate(data);
}
const validateLogin=(data)=>{
     const validSchema=Joi.object({
          email:Joi.string().min(6).required().email(),
          password:Joi.string().min(6).required(),
     
     })
     return validSchema.validate(data);
}

module.exports.validateRegister = validateRegister
module.exports.validateLogin=validateLogin
