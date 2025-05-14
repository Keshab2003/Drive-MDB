const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Name must be of length 3 or more"],
        unique:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:[13,"Email must be of length 13 or more"]
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minlength:[5,"Password must be of length 8 or more"],
    }
})

const user = mongoose.model('User' , userSchema);

module.exports = user;