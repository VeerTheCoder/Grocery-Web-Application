const mongoose=require('mongoose');
const validator=require('validator');
mongoose.connect('mongodb://127.0.0.1:27017/Groco');
const cschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid");
            }
        }
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    city_name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    cpassword:{
        type:String,
        required:true
    }
});

const cmodel=new mongoose.model('customer',cschema);
module.exports=cmodel;