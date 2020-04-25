const mongoose = require('mongoose')
const Schema = mongoose.Schema

var productSchema = new Schema({

    name : {

        type : String,

        required : true,

        trim : true,

        maxlength : 32
    },

    description : {

        type : String,

        required : true,

        trim : true,

        maxlength : 1000

        
    },

    price : {

        type : Number,

        required : true,

        trim : true,

        maxlength : 20
    },

    sold : {

        type : Number,

        default : 0
    },

    stock : {

        type : Number
    },

    photo : {

        type : String,
        default : '/img/product.png'
    },

    discount : {
        type : Number,
        default : 0
    },

    category : {   // using another structure of category in product [ binding relation ]
        // this is one type 
        // another could be seen in Order Schema

        type : Schema.Types.ObjectId, //Schema.ObjectId is enough

        ref : 'Category'
    },

    // destructuring could be used like

    // type : ObjectId

    // but const { ObjectId }  = mongoose.Schema 

    // this needs to be written 

    // now our ObjectId = mongoose.Schema.ObjectId  




} , {timestamps : true});


module.exports = mongoose.model('Product',productSchema,'products')