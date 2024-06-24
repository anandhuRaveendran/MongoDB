const express=require('express');
const app=express();
const routes=require('./routes.js')
 
const port=3001;
const mongoose=require('mongoose')
app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`)
});
app.use(express.json());
app.use('/',routes);

mongoose.connect(
    "mongodb://localhost:27017/UserDetails"
);
const database = mongoose.connection;
database.on("error",(error)=>{
    console.log(error);
});
database.once("connected",()=>{
    console.log("Database Connected");
});
