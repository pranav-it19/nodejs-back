const express= require('express')
const app=express();
const mongoose = require('mongoose');
require("dotenv/config")
app.get('/',(req, res)=>{
     res.send(req.body)
})
const userRoute=require('./routes/auth')
const postRoute=require('./routes/posts')

app.use(express.json())
app.use('/api/users/',userRoute)
app.use('/api/posts/',postRoute)
mongoose.connect(process.env.DB_CONNECTION,
()=>console.log("connected"))
app.listen(8080, ()=>console.log(" Listening at 8080"))