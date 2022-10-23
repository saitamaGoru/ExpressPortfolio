let mongoose = require('mongoose');
let passportlocalmongoose = require('passport-local-mongoose');
//model class
let userModel = mongoose.Schema
(
    {

        username:
        {
            type:String,
            default:"",
            trim:true,
            required:"username is required"
        },
        /*
            password:
            {
            type:String,
            default:"",
            trim:true,
            required:"password is required"
            } 
        */
       email:
       {
            type:String,
            default:"",
            trim:true,
            required:"email address is required"
       },
       displayName:
       {
            type:String,
            default:"",
            trim:true,
            required:"Display name is required"
       },
       created:
       {
            type:Date,
            default:Date.now
           
       },
       update:
       {
            type:Date,
            default:Date.now
           
       }

    },
{
    collection:"users"
});
let options =  ({missingPasswordError:"Wrong/Missing Password"});

userModel.plugin(passportlocalmongoose, options);
module.exports.userModel = mongoose.model('User',userModel);