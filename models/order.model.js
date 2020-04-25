const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProductCartSchema = new Schema({

    product : {
        type : Schema.ObjectId,
        ref : 'Product'
    },
    productid : {
        type : String,

    },
    userid : {       // as i am saving this into DB i need that relation of this user_id to populate into main pages
        type : String
    },
    price : {
        type : Number   // total price of product calculated with its count
    },
    count : {
        type : Number,
        default : 1
    }
})

var orderSchema = new Schema({

    // in the order we have products with different Schema

    products : [], // writing this schema right at this file would be giving specific data related to productcart schema

    transaction_id : { 
        type : String
     },

    amount : {
        type : Number
    },

    // address : String , not delivering so not given

    status : {  // this for Order Status
        type : String,
        default : "Recieved",
        enum : ['Recieved' , 'Shipped' , 'Processing' , 'Delivered' , 'Cancelled']
    },

    userid : {   
        type : String 
    },

    updated : {
        
        type : Date,
        default : Date.now()

    },
    
    names : {
        type : Array
    },
    photos : {
        type : Array
    }

},{timestamps : true})


const ProductCart = mongoose.model('ProductCart',ProductCartSchema,'productcarts')

const Order = mongoose.model('Order',orderSchema,'orders')

module.exports = { ProductCart , Order }

// exporting in a different way 
// needs to be required in this manner

// const Order = require('../models/order.model').Order
// or use destructuring
