const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
    },
    email:{
        type:String,
        trim:true,
        required:true
    }
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;

