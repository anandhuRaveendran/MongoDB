const express=require('express');
const app=express();
const routes=require('./routes.js')
const dotenv=require('dotenv')
const port=3001;
const mongoose=require('mongoose')
app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`)
});

app.use(express.json());
app.use('/',routes);
dotenv.config();
const uri=process.env.mongodb_uri;
mongoose.connect(
    uri   
);
const database = mongoose.connection;
database.on("error",(error)=>{
    console.log(error);
});
database.once("connected",()=>{
    console.log("Database Connected");
});
