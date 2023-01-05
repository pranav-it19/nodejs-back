const router=require("express").Router();
const verify = require('../routes/verifyToken')
router.get("/",verify, (req, res)=>{
     res.json({
          post:{
               title:"My FIrst",
               description:"Something"
          }
     })
})
module.exports=router;