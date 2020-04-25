const mongoose = require('mongoose')

const Schema = mongoose.Schema

const crypto = require("crypto");  // for hashing SHA256 algo

const uuidv1 = require("uuid/v1");  // for different or random salts

// uuidv1 nothing but version 1
// uuidv1() genrates random salts for us

var UserSchema = new Schema({

    firstname : {
        type : String,
        required : true,
        maxlength : 32,   
        trim : true  // deletes unneccessary spaces

    },

    photo : {
        type : String,
        default : '/img/user.png'
    },
    
    lastname : {
        type : String,
        maxlength : 32,
        trim : true
    },

    email : {

        type : String,

        unique : true,   // makes sure every email is used only once

        trim : true,

        required : true
    },

    // could add many other fields later

    userinfo : {
        type : String,
        trim : true
    },

    ency_password : {
        type : String,
        required : true
    },

    password_ResetToken : String,

    password_ResetExpires : {
        type : Date,
    },

    salt : {
        type : String
    },

    role : {
        type : Number,  // more the number more the privilege
        default : 0
    },

    purchases : {
        type : Array ,
        default : [ ]   // as no user comes directly with any purchases
    }

}, {timestamps : true}  // makes sure about creation and updated
);

// writing schema methods that could be handy
UserSchema.methods = {

    secure_password : function(plainpassword){
        if (!plainpassword) { return ""}   // using this because ther our encry_pass req is true
        try { 
               
         return crypto
        .createHmac("sha256", this.salt)  // before calling this secure password 
        // everything should be ready 
        .update(plainpassword)
        .digest("hex");

        }
        catch(err){
            return ""  // making use of required = true in our password section
        }
    },

    authenticate : function (plainpassword){
        return this.secure_password(plainpassword) === this.ency_password
    },

    

    create_reset_token : function() {
        // genreating random reset tokens as uuivd1() gives random things

    var reset_token = uuidv1()
 

    this.password_ResetToken = crypto.createHmac("sha256",process.env.RESET)
    .update(reset_token)
    .digest('hex');

    // reset_token is encrypted now 

    this.password_ResetExpires = Date.now() + 10 * 60 * 1000

    return reset_token

    // it would be sent to the user 
    // if that is recieved while changing the password then only it would be 
    // authorized
     
},

    
}


// writing virtual fields with their getters and setters

UserSchema.virtual('password')
    .set(function(password){
        this._password = password  // making private var in js
        this.salt = uuidv1()  // generates salt or random string to be added
        this.ency_password = this.secure_password(password)
    })
    .get(function(){
        return this._password
    })




module.exports = mongoose.model('User',UserSchema,'users') // will make user collection