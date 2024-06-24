const {Schema}=require('mongoose');
const {model} = require('mongoose');
const users=new Schema({
cert_id:{type:String,required:true},
username:{type:String,required:true},
course:{type:String,required:true},
issuedate:{type:String,required:true},
grade:{type:String,requireed:true}
});
const certificate=model('certificate_list',users);
module.exports=certificate;