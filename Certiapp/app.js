const express = require('express');
const path = require('path');
const app = express();

const dotenv=require('dotenv')
// const Router=require('express');
// var router=Router();
const mongoose=require('mongoose');
const query =require ('./Models/queries.js')


// app.use(express.json());
const port=3000;

app.listen(port,()=>{
    console.log(`server is runnning on port ${port}`)
});

app.use(express.json());
// app.use('/',routes);
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
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

// let certificates = [];

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/issue', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'issueCertificate.html'));
});
app.post('/submit-form',async(req,res)=>{
    console.log(req.body)

    try{
        const data=req.body;
        const result=await query.create(data);
        res.status(201).redirect('/thank-you');
    
    }
    catch(error){
        console.log(error);
        res.status(500).json();
    }
 });
    
app.get('')

// Route to handle form submissions
// app.post('/submit-form', (req, res) => {
//     const { certificateID,courseName, candidateName, grade, date } = req.body;

//     // Store form data in the array
//     certificates.push({ certificateID, courseName, candidateName, grade, date });

//     res.redirect('/thank-you');
//     // Redirect to the certificate view page with the details
//     // res.redirect(`/certificate?id=${id}`);
// });

app.get('/thank-you', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'formsubmitted.html'));
});

app.get('/certificate', (req,res) => {
    res.json(certificates);
})

app.get("/certificate/:id",async (req, res) => {


    res.sendFile(path.join(__dirname, 'public', 'view.html'));

  
});

app.get('/api/certificate/:id',async (req, res) => {
    console.log("reached")
    const id = req.params.id;

    const details = await query.findOne({cert_id: id});
    res.json(details);
});
module.exports=app;