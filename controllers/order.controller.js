// const Order = require('../models/order.model')
// or

const {Order} = require('../models/order.model')


const getOrderById = (req,res,next,orderid) => {

    Order.findById(orderid)

    .exec(
        (err,orderobj) => {
            if (err || !orderobj) {
                return res.status(400).json({status : "fail",
                    error : "No Orders with this Id"
                })
            }
            req.order = orderobj
            next()
        }
    )
}


// creating Order

const createOrder = (req,res,next) => {


    const userid = (req.profile._id).toString()

    const products = req.cartcheckout
    var transaction_id = userid
    var amount = 0
    var names=[]
    var photos =[]
    // manually generating a basic t_id
    for (i of products){
        
        amount = amount + (i.count*i.price)  // calculating total amount
        names.push(i.product.name)
        photos.push(i.product.photo)
    }
    transaction_id = transaction_id + products[0].productid 
    var orderobj = {
        products ,
        transaction_id,
        amount,
        userid,
        names,
        photos

    }
    var order = new Order(orderobj)

    order.save(
    
        (err,neworder) => {

            if(err || !neworder){
            return res.status(500).json({status : "fail",
                    error : "Unable to create Order Sorry!"
                })
            }
            next()
           

        }
    )



}


// for customer

const getOrders = (req,res,next) => {

    const userid = (req.profile._id).toString()
    var sortParameter = req.query.sortParameter ? req.query.sortParameter : 'createdAt'

    var sortOrder = req.query.sortOrder ? req.query.sortOrder : 'desc'
    
    // 1. using Logical ANd
    // 1st expression is a Not operator excluding delivered items using a basic regular exp
    // 2nd making sure i am selecting documents for that particular user
    // Reference MongoDb Manual
    Order.find({$and : [{ status : {$not: { $regex: "^D.*" } }}, {userid : userid} ]})
    .sort([[sortParameter , sortOrder]])
    .exec(
        (err,allorders) => {
            if (err){   // empty array would be returned if deliverd things are only there
                return res.status(400).json({status : "fail",
                    error : "Unable to get Orders right now!!"
                })
            }
            //console.log(allorders)
            res.locals.order = allorders
            res.locals.user = req.profile
            // res.status(200).render('getmyorder')
            next()
        }
        
    )

}

// for admin
const getPossibleOrderStatus = (req,res) => {

    return res.json({status : 'success' , message : Order.schema.path("status").enumValues})

    // to grab values in the database this line is used
    // enumValues is the inbuilt property avialable in mongoose
}

const updateOrderStatus = (req,res) => {

    Order.findByIdAndUpdate((req.order._id).toString(),
        
        {$set : {status : req.body.status}},

        {useFindAndModify : false,new : true},


        (err,order) => {
            if (err) {
                return res.status(400).json({status : "fail",
                    error : "Cannot Update Status"
                })
            }
            return res.status(200).json({status : 'success',message : 'order Updated Successfully'})
        }
        
        )

}


const redirectHome = (req,res) => {

    res.redirect('/gvj-api')
}


const getAllOrders = (req,res) => {

    Order.find({})
    .exec(
        (err,allorders) => {
            if (err || !allorders){
                return res.status(400).json({status : "fail",
                    error : "Unable to get Orders right now!!"
                })
            }
            //console.log(allorders)
            res.locals.allorders = allorders
            res.status(200).render('getallorders')
        }
        
    )

}

const getPurchases = (req,res,next) => {

const userid = (req.profile._id).toString()

    Order.find({userid,status : 'Delivered'})
    .exec(
        (err,allorders) => {
            if (err || !allorders){
                return res.status(400).json({status : "fail",
                    error : "Unable to get Orders right now!!"
                })
            }
            //console.log(allorders)
            res.locals.purchase = allorders
            res.locals.user = req.profile
            //res.status(200).render('getmypurchases')
            next()
        }
        
    )



}

module.exports = {

getOrderById : getOrderById,

createOrder : createOrder,

getAllOrders : getAllOrders,

getOrders : getOrders,

updateOrderStatus : updateOrderStatus,

getPossibleOrderStatus : getPossibleOrderStatus,

redirectHome : redirectHome,

getPurchases : getPurchases

}